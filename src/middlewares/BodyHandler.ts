import { Request as Rq, Response as Rs, NextFunction, response } from "express";
import { AnySchema, ValidationResult } from "joi";
import BadRequestError from "../errors/BadRequestError";

export default function BodyHandler(schema: AnySchema) {
  return (req: Rq, res: Rs, next: NextFunction) => {
    const options = {
      abortEarly: false,
      allowUnknown: true,
      convert: true,
    };

    const { value, error }: ValidationResult<any> = schema.validate(req.body, options);
    if (error) {
      throw new BadRequestError(error.name, error.message);
    }

    req.body = value;
    next();
  };
}
