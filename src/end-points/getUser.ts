import { StatusCode, users } from "../constants";
import { checkIsUserExist, checkIsValidId } from "./helpers";

export const getUser = (userId: string) => {
  checkIsValidId(userId);
  const index = checkIsUserExist(userId);

  return { statusCode: StatusCode.SuccessOK, body: users[index] };
};
