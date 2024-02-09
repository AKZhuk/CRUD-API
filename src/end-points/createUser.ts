import http from "http";
import { v4 as uuidv4 } from "uuid";
import { StatusCode, users } from "../constants";
import { getBody, validateUser } from "./helpers";

export const createUser = async (req: http.IncomingMessage) => {
  let newUser: any = await getBody(req);
  validateUser(newUser);
  newUser.id = uuidv4();
  users.push(newUser);

  return {
    statusCode: StatusCode.SuccessCreated,
    body: users.find((user) => user.id === newUser.id),
  };
};
