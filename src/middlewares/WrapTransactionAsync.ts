import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

type AsyncHandler = (
  req: Request,
  res: Response,
  transaction: mongoose.mongo.ClientSession,
  next?: NextFunction,
) => Promise<void> | void;

function WrapTransactionAsync(fn: AsyncHandler) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      await fn(req, res, session, next);
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      next(error);
    } finally {
      await session.endSession();
    }
  };
}

export default WrapTransactionAsync;
