import { StatusCode, users } from "../constants";
import { checkIsUserExist, checkIsValidId } from "./helpers";

export const deleteUser = (userId: string | undefined) => {
  checkIsValidId(userId);
  const index = checkIsUserExist(userId as string);

  users.splice(index, 1);
  return { statusCode: StatusCode.NoContent, body: undefined };
};
