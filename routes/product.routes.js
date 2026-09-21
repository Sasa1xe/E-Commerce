import express from "express";
import { createDB } from "../db.js";
import { validateBody } from "../validation Middlewares/validateBody.js";
import { productSchema } from "../schemas/products.schema.js";

export const productsRouter = express.Router();
const db = createDB();

//get all products
productsRouter.get("/", async (req, res) => {
  const products = await db.getAll("products");

  return res.status(200).json({
    data: products,
  });
});

//get one product by its ID
productsRouter.get("/:id", async (req, res) => {
  const id = req.url.id;
  const product = await db.getById("products", id);

  if (!product) {
    return res.status(404).json({
      error: "product not found",
    });
  }
  return res.status(200).json({
    product: product,
  });
});

//Create a Product as a (Merchant)
productsRouter.post(
  "/",
  checkrole(),
  validateBody(productSchema),
  async (req, res) => {
    const body = req.body;
    await db.create("products", body);

    return res.status(201).json({
      message: "Product Created Successfully",
    });
  },
);
