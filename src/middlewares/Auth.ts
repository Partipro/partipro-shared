import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import UnauthorizedError from "../errors/UnauthorizedError";

const SECRET_KEY = process.env.SECRET_KEY as string;

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies["ccToken"];

    if (!token) {
      res.clearCookie("ccToken");
      throw new UnauthorizedError("expired_token", "Expired Token");
    }

    req.user = jwt.verify(token, SECRET_KEY) as {
      email: string;
      id: string;
      contract: string;
      role: string;
    };
    next();
  } catch (err) {
    res.clearCookie("ccToken");
    throw new UnauthorizedError("invalid_token", "Invalid Token");
  }
};
