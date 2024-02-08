import http from "http";
import { StatusCode } from "./constants";
import { handleUserRequest } from "./end-points/usersHandler";

const hostname = "127.0.0.1";
const port = Number(process.env.PORT) || 4000;
const server = http.createServer(async (req, res) => {

  try {
    console.log(`${req.method} ${req.url} }`);
    res.setHeader("Content-Type", "application/json");
    switch (req.url) {
      case "/users":
        const { statusCode, body } = handleUserRequest(req);
        res.writeHead(statusCode);
        res.end(JSON.stringify(body));
        break;
      default:
        res.writeHead(StatusCode.ClientErrorNotFound);
        res.end(JSON.stringify({ error: "Resource not found" }));
    }
  } catch (error) {
    res.statusCode = StatusCode.ServerErrorInternal;
    res.setHeader("Content-Type", "application/json");
    res.end("Something is going wrong. Please try later..");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});