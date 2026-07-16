import express from "express";

import getProducts from "./getProducts.js";
import getProduct from "./getProduct.js";
import getProductOrders from "./getProductOrders.js";

const router = express.Router();

router.use("/", getProducts);
router.use("/", getProduct);
router.use("/", getProductOrders);

export default router;
