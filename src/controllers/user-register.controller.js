import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { SALT } from "../constants/salt.js";
import { BadRequestError } from "./../utils/AppError.js";

const userRegisterController = async (req, res) => {
  // Reviso si vino una imagén para guardar
  let imgUrl = "";
  if (req.file) imgUrl = `uploads/${req.file.filename}`;

  const { username, email, pass } = req.body;

  const usedEmail = await UserModel.findOne({
    where: { email },
  });

  if (usedEmail)
    throw new BadRequestError(
      "Ya existe un usuario registrado con ese 'email'.",
      404,
    );

  const id = nanoid();

  const usedId = await UserModel.findOne({
    where: { id },
  });

  if (usedId)
    throw new BadRequestError(
      "Ya existe un usuario registrado con ese 'id'.",
      404,
    );

  const passHash = await bcrypt.hash(pass, SALT);

  const user = UserModel.build({
    id,
    username,
    email,
    pass: passHash,
    avatar: imgUrl,
  });

  await user.save();
  return res.status(201).send({ message: "Usuario registrado con éxito." });
};

export default userRegisterController;
