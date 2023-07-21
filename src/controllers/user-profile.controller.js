import userModel from "../models/userModel.js";
import { ValidationError } from "../utils/AppError.js";

const userProfileController = async (req, res) => {
  const { id: userId } = req;

  const user = await userModel.findByPk(userId);

  if (!user) throw new ValidationError("Usuario no autorizado.", 401);

  const { id, username, email, role, avatar } = user;

  return res.send({ id, username, email, role, avatar });
};

export default userProfileController;
