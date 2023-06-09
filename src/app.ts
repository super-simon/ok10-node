import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { configs } from "./configs/config";
import { ApiError } from "./errors";
import { authRouter } from "./routers/auth.router";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use((err: ApiError, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500;

  return res.status(status).json({
    message: err.message,
    status,
  });
});

app.listen(configs.PORT, () => {
  mongoose.connect(configs.DB_URL as string);
  console.log(`Server has started on port ${configs.PORT}`);
});
