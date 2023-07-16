import userModel from "../models/userModel.js";
import { BadRequestError } from "../utils/AppError.js";

const userGetAllController = async (req, res) => {
  const users = await userModel.findAll({
    attributes: ["id", "username", "email", "avatar"],
  });

  if (!users) throw new BadRequestError("No hay usuarios en esta tabla.", 404);

  return res.send(users);
};

export default userGetAllController;
