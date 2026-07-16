import express from "express";
const router = express.Router();

import bcrypt from "bcrypt";

import requireBody from "#middleware/requireBody";

import { createToken } from "#utils/jwt";

import { getUserByUsername } from "#db/queries/users";

router.post(
  "/",
  requireBody(["username", "password"]),
  async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const user = await getUserByUsername(username);

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send("Invalid credentials.");
      }

      const token = createToken({
        id: user.id,
      });

      res.send(token);
    } catch (err) {
      next(err);
    }
  },
);

export default router;
