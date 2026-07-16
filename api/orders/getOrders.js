import express from "express";
const router = express.Router();

import requireUser from "#middleware/requireUser";

import { getOrdersByUser } from "#db/queries/orders";

router.get("/", requireUser, async (req, res, next) => {
  try {
    const orders = await getOrdersByUser(req.user.id);

    res.send(orders);
  } catch (err) {
    next(err);
  }
});

export default router;
