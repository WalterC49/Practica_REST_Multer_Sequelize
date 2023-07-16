import bcrypt from "bcryptjs";
import { SALT } from "./../constants/salt.js";
import { ValidationError } from "../utils/AppError.js";
import userModel from "../models/userModel.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { unlink } from "fs";

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url)); // dirección actual

const userUpdateController = async (req, res) => {
  // Reviso si vino una imagén para guardar
  let imgUrl = "";
  if (req.file) imgUrl = `uploads/${req.file.filename}`;

  const { id } = req.params;
  const { username, email, oldPass, newPass } = req.body;

  const user = await userModel.findByPk(id);

  if (!user) throw new ValidationError("Usuario no autorizado.", 401);

  const checkPass = await bcrypt.compare(oldPass, user.pass);

  if (!checkPass) throw new ValidationError("Usuario no autorizado.", 401);

  const passHash = await bcrypt.hash(newPass, SALT);

  if (imgUrl) {
    const oldImgUrl = join(CURRENT_DIR, "../" + user.avatar);
    unlink(oldImgUrl, () => {});
    user.avatar = imgUrl;
  }
  user.username = username;
  user.email = email;
  user.pass = passHash;

  await user.save();
  return res.send({ message: "Datos del usuario actualizado." });
};

export default userUpdateController;
