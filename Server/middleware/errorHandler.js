import { ZodError } from "zod";
import { AppError } from "../utils/errorHandling.js";
import logger from "../utils/logger.js";

export const errorMiddleware = (err, req, res) => {
  if (err instanceof ZodError) {
    const errors = {};
    for (const i of err.issues) {
      const key = i.path.join(".");
      if (!errors[key]) errors[key] = i.message;
    }
    return res.status(400).json({
      status: "error",
      message: "Please fix the highlighted fields",
      errors,
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  if (err.code === 11000) {
    logger.error(err);
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      status: "error",
      message: `${field} already exists`,
      errors: { [field]: `This ${field} is already taken` },
    });
  }

  logger.error(err); // your old else branch never logged unexpected errors
  res.status(500).json({ status: "error", message: "Internal Server Error" });
};
