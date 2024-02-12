import http from "http";
import { Messages, StatusCode, users } from "./constants";
import { handleUserRequest } from "./end-points/usersHandler";
import { parseUrl } from "./helpers";
import { CustomError } from "./errors";

export const requestListener = async (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  try {
    const { endPoint } = parseUrl(req.url || "");
    res.setHeader("Content-Type", "application/json");
    switch (endPoint) {
      case "/users":
        const { statusCode, body } = await handleUserRequest(req);
        res.writeHead(statusCode);
        res.end(JSON.stringify(body ?? ""));
        break;
      default:
        throw new CustomError(
          StatusCode.ClientErrorNotFound,
          Messages.ResourceNotFound
        );
    }

    if (process.send) {
      process.send({ type: "update", payload: users });
    }
  } catch (error: unknown) {
    if (error instanceof CustomError) {
      res.statusCode = error.statusCode;
      res.end(JSON.stringify(error.message));
    } else {
      res.statusCode = StatusCode.ServerErrorInternal;
      res.end(Messages.UnknownError);
    }
  }
};
