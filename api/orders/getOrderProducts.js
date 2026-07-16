import express from "express";
const router = express.Router();

import requireUser from "#middleware/requireUser";

import { getOrderById, getProductsByOrder } from "#db/queries/orders";

router.get("/:id/products", requireUser, async (req, res, next) => {
  try {
    const order = await getOrderById(req.params.id);

    if (!order) {
      return res.status(404).send("Order not found.");
    }

    if (order.user_id !== req.user.id) {
      return res.status(403).send("Forbidden.");
    }

    const products = await getProductsByOrder(order.id);

    res.send(products);
  } catch (err) {
    next(err);
  }
});

export default router;
