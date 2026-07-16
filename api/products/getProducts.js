import express from "express";
const router = express.Router();

import { getProducts } from "#db/queries/products";

router.get("/", async (req, res, next) => {
  try {
    const products = await getProducts();

    res.send(products);
  } catch (err) {
    next(err);
  }
});

export default router;
