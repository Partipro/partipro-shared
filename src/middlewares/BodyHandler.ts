import { Request as Rq, Response as Rs, NextFunction } from "express";
import { AnySchema, ValidationResult } from "joi";
import BadRequestError from "../errors/BadRequestError";

export default function BodyHandler<M extends object>(schema: AnySchema) {
  return (req: Rq, _res: Rs, next: NextFunction) => {
    const options = {
      abortEarly: false,
      allowUnknown: true,
      convert: true,
    };

    const { value, error }: ValidationResult<M> = schema.validate(req.body, options);
    if (error) {
      throw new BadRequestError(error.name, error.message);
    }

    req.body = value;
    next();
  };
}
