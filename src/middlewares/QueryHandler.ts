import { Request as Rq, Response as Rs, NextFunction } from "express";
import Joi, { AnySchema } from "joi";
import BadRequestError from "../errors/BadRequestError";
import ServerError from "../errors/ServerError";

export default function QueryHandler(schema: AnySchema) {
  return async (req: Rq, _res: Rs, next: NextFunction) => {
    try {
      const options = {
        abortEarly: false,
        allowUnknown: true,
        convert: true,
        stripUnknown: true,
      };

      const expandSchema = Joi.alternatives()
        .try(
          Joi.string(),
          Joi.object({
            path: Joi.string(),
            populate: Joi.link("#expandSchema"),
          }),
          Joi.array().items(Joi.link("#expandSchema")),
        )
        .id("expandSchema");

      const populateSchema = Joi.object({
        expand: expandSchema.allow(null),
      });

      if (schema) {
        const result = await schema.validate(req.query, options);
        if (result.error) {
          throw new BadRequestError("invalid_query_params", "Parametros de busca inválidos.");
        }
        req.filters = result.value;
      }

      const populateResult = await populateSchema.validate(req.query, options);
      if (!populateResult.error && populateResult.value && populateResult.value.expand) {
        req.populate = populateResult.value.expand;
      }
    } catch (e) {
      throw new ServerError("query_handler_error", "server error");
    } finally {
      next();
    }
  };
}
