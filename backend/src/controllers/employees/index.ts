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
    });
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

const getEmployees = async (req: Request, res: Response) => {
  try {
    const response = await client.query("SELECT * FROM employee");

    if (response.rows.length === 0) {
      // If no records found, return a specific message or status code
      return res.status(404).json({
        message: "No employee records found.",
      });
    }

    res.status(200).json(response.rows);
  } catch (error) {
    console.error("Error getting employees:", error as any);
    res.status(500).json({
      message: "Internal Server Error",
      error: (error as any).message,
    });
  }
};

const getEmployeeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const response = await client.query(
      "SELECT * FROM employee WHERE emp_id = $1",
      [id]
    );

    if (response.rows.length === 0) {
      // If no records found, return a specific message or status code
      return res.status(404).json({
        message: "No employee records found.",
      });
    }

    res.status(200).json(response.rows);
  } catch (error) {
    console.error("Error getting employees:", error as any);
    res.status(500).json({
      message: "Internal Server Error",
      error: (error as any).message,
    });
  }
};

const updateEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, salary, address } = req.body;
  try {
    const response = await client.query(
      "UPDATE employee SET name = $1, email = $2, salary = $3, address = $4 WHERE emp_id = $5",
      [name, email, salary, address, id]
    );

    if (response.rowCount === 0) {
      // If no records found, return a specific message or status code
      return res.status(404).json({
        message: "No employee records found.",
      });
    }

    res.status(200).json({
      message: "Employee updated successfully",
    });
  } catch (error) {
    console.error("Error getting employees:", error as any);
    res.status(500).json({
      message: "Internal Server Error",
      error: (error as any).message,
    });
  }
};

const deleteEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const response = await client.query(
      "DELETE FROM employee WHERE emp_id = $1",
      [id]
    );

    if (response.rowCount === 0) {
      // If no records found, return a specific message or status code
      return res.status(404).json({
        message: "No employee records found.",
      });
    }

    res.status(200).json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.error("Error getting employees:", error as any);
    res.status(500).json({
      message: "Internal Server Error",
      error: (error as any).message,
    });
  }
};

const totalsalary = async (req: Request, res: Response) => {
  try {
    const response = await client.query("SELECT SUM(salary) FROM employee");

    if (response.rows.length === 0) {
      // If no records found, return a specific message or status code
      return res.status(404).json({
        message: "No employee records found.",
      });
    }

    res.status(200).json(response.rows[0]);
  } catch (error) {
    console.error("Error getting employees:", error as any);
    res.status(500).json({
      message: "Internal Server Error",
      error: (error as any).message,
    });
  }
};

const getempcount = async (req: Request, res: Response) => {
  try {
    const response = await client.query("SELECT COUNT(emp_id) FROM employee");

    if (response.rows.length === 0) {
      // If no records found, return a specific message or status code
      return res.status(404).json({
        message: "No employee records found.",
      });
    }

    res.status(200).json(response.rows[0]);
  } catch (error) {
    console.error("Error getting employees:", error as any);
    res.status(500).json({
      message: "Internal Server Error",
      error: (error as any).message,
    });
  }
};

export {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  totalsalary,
  getempcount,
};
