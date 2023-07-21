import userModel from "../models/userModel.js";
import { BadRequestError } from "../utils/AppError.js";

const userGetController = async (req, res) => {
  const { id: userId } = req.params;

  const user = await userModel.findByPk(userId);

  if (!user)
    throw new BadRequestError("No existe un usuario con ese 'id'.", 404);

  const { id, username, email, role, avatar } = user;

  return res.send({ id, username, email, role, avatar });
};

export default userGetController;
