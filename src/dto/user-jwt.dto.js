import { promisify } from "util";
import jwt from "jsonwebtoken";
import { AppError } from "./../utils/AppError.js";

const userJWTDTO = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new AppError("Usuario no autorizado.", 401);
    }

    const token = authorization.split(" ")[1]; // [Bearer, token]
    if (!token) {
      throw new AppError("Usuario no autorizado.", 401);
    }

    const { id, role } = await promisify(jwt.verify)(
      token,
      process.env.JWT_PRIVATE_KEY,
    );

    req.id = id;
    req.role = role;

    next();
  } catch (error) {
    next(error);
  }
};

export default userJWTDTO;
