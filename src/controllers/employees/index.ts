import { Request, Response } from "express";
import { client } from "../../app";

const createEmployee = async (req: Request, res: Response) => {
  const { name, email, salary, address } = req.body;
  try {
    const response = await client.query(
      "INSERT INTO employee (name, email, salary, address) VALUES ($1, $2, $3, $4)",
      [name, email, salary, address]
    );
    res.status(201).json({
      message: "Employee Added Successfully",
      body: {
        employee: { name, email, salary, address },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export { createEmployee };
