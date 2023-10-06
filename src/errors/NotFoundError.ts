import BaseError from "./BaseError";
import { httpStatusCodes } from "../constants";

class NotFoundError extends BaseError {
  constructor(name = "", description = "Not found.") {
    super(name, httpStatusCodes.NOT_FOUND, true, description);
  }
}

export default NotFoundError;
