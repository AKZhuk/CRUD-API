import { StatusCode, Messages } from "./constants";
import { CustomError } from "./errors";
import os from "os";

export const getWorkersPorts = () => {
  const WORKER_PORTS = [];
  for (let i = 1; i < os.availableParallelism(); i++) {
    const WORKER_PORT = Number(process.env.PORT!) + i;
    WORKER_PORTS.push(WORKER_PORT);
  }
  return WORKER_PORTS;
};

export const parseUrl = (url: string) => {
  const match = url.match(/^(\/users)(?:\/([a-zA-Z0-9_-]+))?$/);
  if (match) {
    const endPoint = match[1];
    const userId = match[2];

    if (userId) {
      return { endPoint: endPoint, userId: userId };
    } else {
      return { endPoint: endPoint };
    }
  } else {
    throw new CustomError(
      StatusCode.ClientErrorNotFound,
      Messages.ResourceNotFound
    );
  }
};
