import type { IncomingMessage, ServerResponse } from "http";

export const productController = (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;

  if (url === "/product" && method === "GET") {
    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(JSON.stringify({ message: "Product retRived Successfully" ,data:{}}));
  }
};
