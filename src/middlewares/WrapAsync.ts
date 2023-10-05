import { NextFunction, Request, Response } from "express";

function WrapAsync(fn: (req: Request, res: Response, next?: NextFunction) => Promise<void> | void) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export default WrapAsync;
