import { StatusCode } from "./constants";

export class CustomError extends Error {
  statusCode: StatusCode;
  constructor(statusCode: StatusCode, message: string) {
    super(message);
    this.name = "CustomServerError";
    this.statusCode = statusCode;
  }
}
