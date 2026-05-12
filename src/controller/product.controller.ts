import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";

export const productController = (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;
  //   product => product/1 => ['',"product",'1']
  const urlParts = url?.split("/");
  // console.log(urlParts);
  const id = urlParts && urlParts[1] === "product" ? Number(urlParts[2]) : null;
  //   console.log(id);

  //*..................GET All products get method..................
  if (url === "/product" && method === "GET") {
    const products = readProduct();
    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(
      JSON.stringify({
        message: "Products retRived Successfully",
        data: products,
      }),
    );
  }
  //*..................GET Single product get method..................
  else if (method === "GET" && id !== null) {
    const products = readProduct();
    const product = products.find((p: IProduct) => p.id === id);
    // console.log(product);
    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(
      JSON.stringify({
        message: "Product retRived Successfully",
        data: product,
      }),
    );
  }
};
