import express from "express";
const router = express.Router();

import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

import { createOrder } from "#db/queries/orders";

router.post("/", requireUser, requireBody(["date"]), async (req, res, next) => {
  try {
    const { date, note } = req.body;

    const order = await createOrder(date, note, req.user.id);

    res.status(201).send(order);
  } catch (err) {
    next(err);
  }
});

export default router;
