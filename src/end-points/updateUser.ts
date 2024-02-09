import http from "http";
import { StatusCode, users } from "../constants";
import { checkIsUserExist, checkIsValidId, getBody } from "./helpers";

export const updateUser = async (
  req: http.IncomingMessage,
  id: string | undefined
) => {
  checkIsValidId(id);
  const index = checkIsUserExist(id as string);

  let updatedUser: any = await getBody(req);
  users[index] = { ...users[index], ...updatedUser };

  return { statusCode: StatusCode.SuccessOK, body: users[index] };
};
