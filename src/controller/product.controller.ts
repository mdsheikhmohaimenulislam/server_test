import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";
import { sendResponse } from "../utility/sendResponse";

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
    try {
      const products = readProduct();
      return sendResponse(
        res,
        200,
        true,
        "Products retRived Successfully",
        products,
      );
    } catch (error) {
      return sendResponse(res, 500, false, "Something went wrong!", error);
    }
  }
  //*..................GET Single product get method..................
  else if (method === "GET" && id !== null) {
    const products = readProduct();
    const product = products.find((p: IProduct) => p.id === id);
    // console.log(product);
    try {
      if (!product) {
        return sendResponse(res, 404, false, "Product not found!", product);
      }
      return sendResponse(
        res,
        200,
        true,
        "Product retRived Successfully",
        product,
      );
    } catch (error) {
      return sendResponse(res, 500, false, "Something went wrong!", error);
    }
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
    try {
      products.push(newProduct);
      insertProduct(products);
      return sendResponse(
        res,
        200,
        true,
        "Product retRived Successfully",
        newProduct,
      );
    } catch (error) {
      return sendResponse(res, 500, false, "Something went wrong!", error);
    }
  }
  //*..................PUT method Product updated..................
  else if (method === "PUT" && id !== null) {
    // Updated product by PUT method
    const body = await parseBody(req);
    const products = readProduct();

    const index = products.findIndex((p: IProduct) => p.id === id);
    // console.log(index);
    try {
      if (index < 0) {
        return sendResponse(res, 404, false, "Product not found!", null);
      }

      // console.log(products[index]);
      products[index] = { id: products[index].id, ...body };

      insertProduct(products);

      return sendResponse(
        res,
        200,
        true,
        "Product updated successfully!",
        products[index],
      );
    } catch (error) {
      return sendResponse(res, 500, false, "Something went wrong!", error);
    }
  }
  //*..................DELETE method Product DELETE..................
  else if (method === "DELETE" && id !== null) {
    const products = readProduct();
    const index = products.findIndex((p: IProduct) => p.id === id);
    try {
      if (index < 0) {
        return sendResponse(res, 404, false, "Product not found!", null);
      }
      products.splice(index, 1);
      insertProduct(products);
      return sendResponse(
        res,
        200,
        true,
        "Product Deleted successfully!",
        null,
      );
    } catch (error) {
      return sendResponse(
        res,
        200,
        true,
        "Product Deleted successfully!",
        error,
      );
    }
  }
};
