import userModel from "../models/userModel.js";
import { ValidationError } from "../utils/AppError.js";

const userUpdateNameController = async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;

  const user = await userModel.findByPk(id);

  if (!user) throw new ValidationError("Usuario no autorizado.", 401);

  user.username = username;

  await user.save();
  return res.send({ message: "Username actualizado." });
};

export default userUpdateNameController;
