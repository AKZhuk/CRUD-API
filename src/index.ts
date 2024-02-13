import { requestListener } from "./requestListener";
import http from "http";
import { createClusterServer } from "./cluster";

const createServer = () => {
  const mode = process.env.SERVER_MODE;
  if (mode === "MULTI") {
    createClusterServer();
  } else {
    const hostname = process.env.HOST;
    const port = process.env.PORT || 4000;
    const server = http.createServer(requestListener);
    server.listen(port, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
  }
};

createServer();
