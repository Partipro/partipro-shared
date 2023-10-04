import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const SECRET_KEY = process.env.SECRET_KEY as string;

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies["ccToken"];

    if (!token) {
      return res.status(403).clearCookie("ccToken").send("Access denied.");
    }

    req.user = jwt.verify(token, SECRET_KEY) as {
      email: string;
      id: number;
    };
    next();
  } catch (err) {
    res.status(401).clearCookie("ccToken").send("Invalid token");
  }
};
