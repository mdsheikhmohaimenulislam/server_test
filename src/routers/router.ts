import type { IncomingMessage, ServerResponse } from "http";

export const routeHandler = (req:IncomingMessage,res:ServerResponse)=>{
 const url = req.url;
  const method = req.method;
  //   console.log(req.url);
  //   console.log(req.method);
  if (url === "/" && method === "GET") {
    // console.log("This is Root route");
    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(JSON.stringify({ message: "this is end root router" }));
  } else if (url?.startsWith("/product")) {
    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(JSON.stringify({ message: "this is product route" }));
  } else {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Route is not found" }));
  }
}