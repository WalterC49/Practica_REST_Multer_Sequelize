import { Router } from "express";
import { tryCatch } from "../utils/tryCatch.js";
import userGetController from "./../controllers/user-get.controller.js";
import userGetAllController from "./../controllers/user-getAll.controller.js";
import userRegisterDTO from "./../dto/user-register.dto.js";
import userRegisterController from "./../controllers/user-register.controller.js";
import userUpdateDTO from "./../dto/user-update.dto.js";
import userUpdateController from "./../controllers/user-update.controller.js";
import userUpdateNameDTO from "./../dto/user-update-name.dto.js";
import userUpdateNameController from "./../controllers/user-update-name.controller.js";
import userDeleteDTO from "./../dto/user-delete.dto.js";
import userDeleteController from "./../controllers/user-delete.controller.js";
import userLoginDTO from "./../dto/user-login.dto.js";
import userLoginController from "./../controllers/user-login.controller.js";
import userJWTDTO from "../dto/user-jwt.dto.js";
import userProfileController from "../controllers/user-profile.controller.js";
import fileUpload from "./../utils/fileUpload.js";

const userRouter = Router();

// Login + Auth
userRouter.route("/login").post(userLoginDTO, tryCatch(userLoginController));
userRouter.route("/profile").get(userJWTDTO, tryCatch(userProfileController));

// Api REST Methods
userRouter
  .route("/")
  .get(userGetAllController)
  .post(fileUpload, userRegisterDTO, tryCatch(userRegisterController));

userRouter
  .route("/:id")
  .get(tryCatch(userGetController))
  .put(fileUpload, userUpdateDTO, userJWTDTO, tryCatch(userUpdateController))
  .patch(userUpdateNameDTO, userJWTDTO, tryCatch(userUpdateNameController))
  .delete(userDeleteDTO, userJWTDTO, tryCatch(userDeleteController));

export default userRouter;
