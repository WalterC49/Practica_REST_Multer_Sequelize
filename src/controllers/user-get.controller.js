import userModel from "../models/userModel.js";
import { BadRequestError } from "../utils/AppError.js";

const userGetController = async (req, res) => {
  const { id } = req.params;

  const user = await userModel.findByPk(id);

  if (!user)
    throw new BadRequestError("No existe un usuario con ese 'id'.", 404);

  const { _id, username, email, role, avatar } = user;

  return res.send({ _id, username, email, role, avatar });
};

export default userGetController;
