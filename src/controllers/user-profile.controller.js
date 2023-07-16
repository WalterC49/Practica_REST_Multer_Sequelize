import userModel from "../models/userModel.js";
import { ValidationError } from "../utils/AppError.js";

const userProfileController = async (req, res) => {
  const { id } = req;

  const user = await userModel.findByPk(id);

  if (!user) throw new ValidationError("Usuario no autorizado.", 401);

  const { _id, username, email, role, avatar } = user;

  return res.send({ _id, username, email, role, avatar });
};

export default userProfileController;
