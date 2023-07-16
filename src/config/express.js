import express from "express";
import userRouter from "../routes/user.routes.js";
import { AppError } from "../utils/AppError.js";
import { errorHandler } from "../utils/errorHandler.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));

const app = express();

// Middlewares
app.use("/uploads", express.static(join(CURRENT_DIR, "../uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", userRouter);

// NOT FOUND ROUTE
app.all("*", (req, res, next) => {
  const err = new AppError(`Can't find ${req.originalUrl} on the server!`, 404);
  next(err);
});

app.use(errorHandler);

export default app;
