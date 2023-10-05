import BaseError from "./BaseError";
import { httpStatusCodes } from "../constants";

class BadRequestError extends BaseError {
  constructor(name = "", description = "Bad request.") {
    super(name, httpStatusCodes.BAD_REQUEST, true, description);
  }
}

export default BadRequestError;
