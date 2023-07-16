import jwt from "jsonwebtoken";
import {
  AjvError,
  AppError,
  BadRequestError,
  ValidationError,
} from "./AppError.js";
import multer from "multer";
import { unlink } from "fs";

export const errorHandler = async (error, req, res, next) => {
  // como no sabía como hacer para validar primero y luego subir foto,
  // si la validación falla borro la foto que se subio si había alguna
  const avatar = await req.file;
  if (avatar) unlink(avatar.path, () => {});

  if (error instanceof ValidationError) {
    return res.status(error.statusCode).json({
      name: error.name,
      message: error.message,
    });
  }

  if (error instanceof AjvError) {
    return res.status(error.statusCode).json({
      name: error.name,
      message: error.message.split(","),
    });
  }

  if (error instanceof BadRequestError) {
    return res.status(error.statusCode).json({
      name: error.name,
      message: error.message,
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      name: error.names,
      message: error.message,
    });
  }

  if (error instanceof jwt.JsonWebTokenError) {
    return res.status(401).json({
      name: error.name,
      message: error.message,
    });
  }

  if (error instanceof multer.MulterError) {
    return res.status(401).json({
      name: error.name,
      message: error.message,
    });
  }
  /* 
  if (error instanceof Error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
  } */

  return res.status(500).send("Internal Server Error");
};
