import express from "express";
const router = express.Router();

import { getProductById } from "#db/queries/products";

router.get("/:id", async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id);

    if (!product) {
      return res.status(404).send("Product not found.");
    }

    res.send(product);
  } catch (err) {
    next(err);
  }
});

export default router;
