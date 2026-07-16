import express from "express";

import createOrder from "./createOrder.js";
import getOrders from "./getOrders.js";
import getOrder from "./getOrder.js";
import addProductToOrder from "./addProductToOrder.js";
import getOrderProducts from "./getOrderProducts.js";

const router = express.Router();

router.use("/", createOrder);
router.use("/", getOrders);
router.use("/", getOrder);
router.use("/", addProductToOrder);
router.use("/", getOrderProducts);

export default router;
