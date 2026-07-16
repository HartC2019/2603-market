import express from "express";
const router = express.Router();

import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

import { getOrderById, addProductToOrder } from "#db/queries/orders";
import { getProductById } from "#db/queries/products";

router.post(
  "/:id/products",
  requireUser,
  requireBody(["productId", "quantity"]),
  async (req, res, next) => {
    try {
      const order = await getOrderById(req.params.id);

      if (!order) {
        return res.status(404).send("Order not found.");
      }

      if (order.user_id !== req.user.id) {
        return res.status(403).send("Forbidden.");
      }

      const { productId, quantity } = req.body;

      const product = await getProductById(productId);

      if (!product) {
        return res.status(400).send("Product not found.");
      }

      const orderProduct = await addProductToOrder(
        order.id,
        productId,
        quantity,
      );

      res.status(201).send(orderProduct);
    } catch (err) {
      next(err);
    }
  },
);

export default router;
