import { Router } from "express";
import { createUser } from "../controllers/auth.controller.js";

const router = Router();

router.get("/anothertest", (req, res) => {
  res.status(200).send("User route");
});

router.post("/register", createUser);

export default router;
