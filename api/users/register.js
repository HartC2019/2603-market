import express from "express";
const router = express.Router();

import requireBody from "#middleware/requireBody";
import { createToken } from "#utils/jwt";
import { createUser } from "#db/queries/users";

router.post(
  "/",
  requireBody(["username", "password"]),
  async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const user = await createUser(username, password);

      const token = createToken({
        id: user.id,
      });

      res.status(201).send(token);
    } catch (err) {
      next(err);
    }
  },
);

export default router;
