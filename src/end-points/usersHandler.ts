import http from "http";
import { HTTPMethod, StatusCode } from "../constants";


export const handleUserRequest = (req: http.IncomingMessage) => {
  console.log("req.method", req.method);
  //const [_, userId] = req.url?.split("/") || "";
  //const index = users.findIndex((user) => user.id === userId);

  switch (req.method) {
    case HTTPMethod.GET:
    case HTTPMethod.POST:
    case HTTPMethod.PUT:
    case HTTPMethod.DELETE:
    default:
      return {
        statusCode: StatusCode.ServerErrorInternal,
        body: "something went wrong",
      };
  }
};
