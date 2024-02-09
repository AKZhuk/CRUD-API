import { requestListener } from "./requestListener";
import http from "http";

const createServer = () => {
  const hostname = process.env.HOST;
  const port = process.env.PORT || 4000;
  const server = http.createServer(requestListener);
  server.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
};

createServer();
