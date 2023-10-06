import BaseError from "./BaseError";
import { httpStatusCodes } from "../constants";

class UnauthorizedError extends BaseError {
  constructor(name = "", description = "Unauthorized.") {
    super(name, httpStatusCodes.UNAUTHORIZED, true, description);
  }
}

export default UnauthorizedError;
