import http from "http";
import { HTTPMethod, StatusCode } from "../constants";
import { getUsers } from "./getUsers";
import { getUser } from "./getUser";
import { deleteUser } from "./deleteUser";
import { updateUser } from "./updateUser";
import { createUser } from "./createUser";
import { parseUrl } from "./../helpers";

export const handleUserRequest = (req: http.IncomingMessage) => {
  const { userId } = parseUrl(req.url || "");

  switch (req.method) {
    case HTTPMethod.GET:
      return userId ? getUser(userId) : getUsers();
    case HTTPMethod.POST:
      return createUser(req);
    case HTTPMethod.PUT:
      return updateUser(req, userId);
    case HTTPMethod.DELETE:
      return deleteUser(userId);
    default:
      return {
        statusCode: StatusCode.ServerErrorInternal,
        body: "something went wrong",
      };
  }
};
