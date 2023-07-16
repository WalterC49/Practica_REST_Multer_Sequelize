import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import { ValidationError } from "../utils/AppError.js";
import { unlink } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url)); // dirección actual

const userDeleteController = async (req, res) => {
  const { id } = req.params;
  const { pass } = req.body;

  const user = await userModel.findByPk(id);

  if (!user) throw new ValidationError("Usuario no autorizado.", 401);

  const imgUrl = join(CURRENT_DIR, "../" + user.avatar); // subo un nivel y voy al 'path' de avatar

  if (req.role === "Admin") {
    await user.destroy();
    unlink(imgUrl, () => {});
    return res.send({ message: "Usuario eliminado." });
  }

  const checkPass = await bcrypt.compare(pass, user.pass);

  if (!checkPass) throw new ValidationError("Usuario no autorizado.", 401);

  await user.destroy();
  unlink(imgUrl, () => {});

  return res.send({ message: "Usuario eliminado." });
};

export default userDeleteController;
