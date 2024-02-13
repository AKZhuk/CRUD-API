import cluster, { Worker } from "cluster";
import os from "os";
import { createServer } from "http";
import { createBalancer } from "./balancerServer";
import { users } from "./constants";
import { User } from "types";
import { requestListener } from "./requestListener";

export const createClusterServer = () => {
  const workers: Worker[] = [];
  if (cluster.isPrimary) {
    for (let i = 0; i < os.availableParallelism(); i++) {
      const WORKER_PORT = Number(process.env.PORT!) + i;
      const worker = cluster.fork({
        WORKER_PORT: WORKER_PORT,
      });
      workers.push(worker);
    }

    let sharedData = users;

    cluster.on("message", (_, message) => {
      if (message.type === "update") {
        sharedData = message.payload;

        Object.values(cluster.workers!).forEach((worker) => {
          worker?.send({ type: "data", payload: sharedData });
        });
      }
    });

    cluster.on("exit", (worker) => {
      console.log(`Worker ${worker.process.pid} died.`);
      console.log("Starting a new worker");
      cluster.fork({ WORKER_ID: workers.length });
    });
  } else {
    const { PORT, WORKER_PORT } = process.env;
    const isBalancer = WORKER_PORT! === PORT!;
    createServer(isBalancer ? createBalancer() : requestListener).listen(
      process.env.WORKER_PORT,
      () => {
        console.log(
          `${isBalancer ? "Load balancer worker" : "Worker"} ${
            cluster.worker!.id
          } started and listening on port ${process.env.WORKER_PORT}`
        );
      }
    );

    process.on("message", (message: { type: String; payload: User[] }) => {
      if (message.type === "data") {
        users.length = 0;
        users.push(...message.payload);
      }
    });
  }
};
