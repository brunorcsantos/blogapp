import { Router } from "express";
import { createUser, getAllUsers, getUser, login, validateToken } from "../controllers/auth.controller.js";

const router = Router();

router.get("/anothertest", (req, res) => {
  res.status(200).send("User route");
});

router.post("/register", createUser);
router.post("/login", login);
router.get("/", getAllUsers);
router.get("/:id", getUser);

export default router;
