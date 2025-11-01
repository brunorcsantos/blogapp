import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  const user = new User(req.body);

  if (!user.username || !user.email || !user.password)
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);

  const newUser = new User({
    username: user.username,
    email: user.email,
    password: hashedPassword,
  });

  await newUser.save();

  const { password: _, ...userWithoutPassword } = newUser.toObject();

  res
    .status(201)
    .json({ message: "User created succesfully!", user: userWithoutPassword });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(401).json("Email e senha são obrigatórios");

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(401).json({ message: "Credenciais inválidas." });
  }

  const verifyPassword = await bcrypt.compare(password, user.password);

  if (!verifyPassword) {
    return res.status(401).json({ Message: "Credenciais inválidas" });
  }

  const token = jwt.sign(
    { email: user.email, name: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  return res.status(200).json({ token });
};

// TODO: CRIAR ROTA DE LOGOUT
export const logout = async (req, res) => {
  res.status(200).json({ deleteToken: true });
};
// TODO: LISTAR TODOS OS USUARIOS
// TODO: LISTAR UM USUÁRIO
// TODO VERIFICAR O TOKEN
export const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json("Token não fornecido!");
  }
  const token = authorization.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido ou expirado." });
    }

    // 4. Armazena os dados do usuário no request (para uso posterior)
    req.user = decoded;
    next(); // segue para a próxima função (rota)
  });
};
