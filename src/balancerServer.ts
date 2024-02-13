import { getWorkersPorts } from "./helpers";
import http, { request } from "http";

export const createBalancer = () => {
  const WORKER_PORTS = getWorkersPorts();
  return (req: http.IncomingMessage, res: http.ServerResponse) => {
    const PORT = WORKER_PORTS.shift();

    if (PORT) {
      console.log("inner request forwarded to", PORT);

      const connector = request(
        {
          host: process.env.HOST,
          path: req.url,
          method: req.method,
          headers: req.headers,
          port: PORT,
        },
        (workerResponse) => {
          res.setHeader("Content-Type", "application/json");
          res.statusCode = workerResponse.statusCode!;
          workerResponse.pipe(res);
        }
      );
      req.pipe(connector);
      WORKER_PORTS.push(PORT!);
    }
  };
};
