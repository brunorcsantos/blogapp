import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export const createUser = async (req, res) => {
  const user = new User(req.body);

  if (!user.username || !user.email || !user.password)
    return res.status(400).json({ message: "Todos os campos são obrigatórios." });

  const salt = bcrypt.genSaltSync(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  const newuser = await user.save();

  res.status(200).json(newuser);
};
