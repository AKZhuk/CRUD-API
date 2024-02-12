import { User } from "types";

export enum StatusCode {
  BadRequest = 400,
  ClientErrorNotFound = 404,
  ServerErrorInternal = 500,
  SuccessOK = 200,
  SuccessCreated = 201,
  NoContent = 204,
}

export enum HTTPMethod {
  DELETE = "DELETE",
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
}

export enum Messages {
  InvalidId = "Invalid user id",
  UserNotExist = "User does not exist",
  MissedRequiredField = "body does not contain required fields",
  ResourceNotFound = "Resource not found",
  UnknownError = "the server encountered an error please try again later",
}
export const users: User[] = [];
