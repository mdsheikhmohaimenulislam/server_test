import { createServer, IncomingMessage } from "http";
import { routeHandler } from "./routers/router";
import config from "./config";



const server = createServer((req: IncomingMessage, res) => {
  routeHandler(req, res);
});

server.listen(config.port, () => {
  console.log(`server the running on the port ${3000}`);
});
