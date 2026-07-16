import express from "express";

import register from "./register.js";
import login from "./login.js";

const router = express.Router();

router.use("/register", register);
router.use("/login", login);

export default router;
