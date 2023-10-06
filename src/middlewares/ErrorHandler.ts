import { NextFunction, Request, Response } from "express";
import BaseError from "../errors/BaseError";

const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof BaseError) {
    const { name, statusCode, isOperational, message } = err;
    res.status(statusCode).json({
      error: {
        name,
        message,
        isOperational,
      },
    });
  } else {
    next(err);
  }
};

export default ErrorHandler;
