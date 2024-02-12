import { User } from "types";
import { Messages, StatusCode, users } from "../constants";
import { CustomError } from "../errors";
import { validate as uuidValidate } from "uuid";
import http from "http";
export const checkIsValidId = (id: string | undefined) => {
  if (!id || !uuidValidate(id)) {
    throw new CustomError(StatusCode.BadRequest, Messages.InvalidId);
  }
};

export const checkIsUserExist = (id: string) => {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    throw new CustomError(
      StatusCode.ClientErrorNotFound,
      Messages.UserNotExist
    );
  }
  return index;
};

export const validateUser = (user: User) => {
  if (!user.age || !user.username || !user.hobbies) {
    throw new CustomError(StatusCode.BadRequest, Messages.MissedRequiredField);
  }
};

export const getBody = async (req: http.IncomingMessage) => {
  return new Promise((resolve, reject) => {
    let body: string = "";
    req.on("data", function (chunk) {
      body += chunk;
    });

    req.on("end", function () {
      if (!body) {
        resolve("");
      }
      resolve(JSON.parse(body));
    });

    req.on("error", () => {
      reject(
        new CustomError(StatusCode.ServerErrorInternal, Messages.UnknownError)
      );
    });
  });
};
