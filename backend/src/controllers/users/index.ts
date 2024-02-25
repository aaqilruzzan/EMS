import { Request, Response } from "express";
import { client } from "../../app";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const response = await client.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [name, email, hashedPassword]
    );

    if (process.env.JWT_SECRET != undefined) {
      const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.status(201).json({
        message: "User Added Successfully",
        token,
      });
    } else {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  } catch (error) {
    console.error("Error creating employee:", error as any);

    // Handle specific error cases
    if ((error as any).code === "23505") {
      // Unique violation (assuming email is a unique constraint)
      return res.status(409).json({
        message: "Email address already exists. Please use a different email.",
      });
    } else {
      // Generic server error
      res.status(500).json({
        message: "Internal Server Error",
        error: (error as any).message,
      });
    }
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const response = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (response.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const user = response.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }
    if (process.env.JWT_SECRET != undefined) {
      const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.status(200).json({
        message: "Login successful",
        token,
      });
    } else {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  } catch (error) {
    console.error("Error logging in:", error as any);
    res.status(500).json({
      message: "Internal Server Error",
      error: (error as any).message,
    });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const response = await client.query("SELECT * FROM users");

    if (response.rows.length === 0) {
      // If no records found, return a specific message or status code
      return res.status(404).json({
        message: "No user records found.",
      });
    }

    res.status(200).json(response.rows);
  } catch (error) {
    console.error("Error getting users:", error as any);
    res.status(500).json({
      message: "Internal Server Error",
      error: (error as any).message,
    });
  }
};

const getUserCount = async (req: Request, res: Response) => {
  try {
    const response = await client.query("SELECT COUNT(*) FROM users");

    if (response.rows.length === 0) {
      // If no records found, return a specific message or status code
      return res.status(404).json({
        message: "No user records found.",
      });
    }

    res.status(200).json(response.rows[0]);
  } catch (error) {
    console.error("Error getting user count:", error as any);
    res.status(500).json({
      message: "Internal Server Error",
      error: (error as any).message,
    });
  }
};

export { register, login, getUsers, getUserCount };
