import express from "express";
const router = express.Router();

import requireUser from "#middleware/requireUser";

import { getProductById, getProductOrders } from "#db/queries/products";

router.get("/:id/orders", requireUser, async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id);

    if (!product) {
      return res.status(404).send("Product not found.");
    }

    const orders = await getProductOrders(req.params.id, req.user.id);

    res.send(orders);
  } catch (err) {
    next(err);
  }
});

export default router;
