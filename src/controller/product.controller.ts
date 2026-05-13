import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  //   console.log(req);

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
  //*..................POST Single product POST method..................
  else if (method === "POST" && url === "/products") {
    const body = await parseBody(req);
    // console.log(body);
    const products = readProduct();
    const newProduct = {
      id: Date.now(),
      ...body,
    };
    // console.log(newProduct);
    products.push(newProduct);
    insertProduct(products);
    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(
      JSON.stringify({
        message: "Product retRived Successfully",
        data: newProduct,
      }),
    );
  } else if (method === "PUT" && id !== null) {
    // Updated product by PUT method
    const body = await parseBody(req);
    const products = readProduct();

    const index = products.findIndex((p: IProduct) => p.id === id);
    // console.log(index);
    if (index < 0) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product not found!",
          data: null,
        }),
      );
    }

    // console.log(products[index]);
    products[index] = { id: products[index].id, ...body };

    insertProduct(products);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product updated successfully!",
        data: products[index],
      }),
    );
  }
};
