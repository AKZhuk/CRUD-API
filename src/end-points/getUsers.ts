import { StatusCode, users } from "../constants";

export const getUsers = () => {
  return { statusCode: StatusCode.SuccessOK, body: users };
};
