import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { ValidationError } from "../utils/AppError.js";

const userLoginController = async (req, res) => {
  const { email, pass } = req.body;

  const user = await userModel.findOne({ where: { email } });

  if (!user) throw new ValidationError("Credenciales incorrectas.", 401);

  const checkPass = await bcrypt.compare(pass, user.pass);

  if (!checkPass) throw new ValidationError("Credenciales incorrectas.", 401);

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_PRIVATE_KEY,
    { expiresIn: "7d" },
  );

  res.send(token);
};

export default userLoginController;
