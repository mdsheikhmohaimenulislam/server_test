import { createServer, IncomingMessage } from "http";
import { json } from "stream/consumers";
import { routeHandler } from "./routers/router";

const server = createServer((req: IncomingMessage, res) => {
  routeHandler(req, res);
});

server.listen(3000, () => {
  console.log(`server the running on the port ${3000}`);
});
