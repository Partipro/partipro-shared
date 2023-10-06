import BaseError from "./BaseError";
import { httpStatusCodes } from "../constants";

class ServerError extends BaseError {
  constructor(name = "", description = "Server error") {
    super(name, httpStatusCodes.INTERNAL_SERVER, true, description);
  }
}

export default ServerError;
