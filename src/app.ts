//EXPRESS
import express from "express";
import { Request, Response } from "express";
import mongoose from "mongoose";

import { configs } from "./configs/config";
import { User } from "./models/User.model";
import { IUser } from "./types/user.type";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get(
  "/users",
  async (_req: Request, res: Response): Promise<Response<IUser[]> | void> => {
    try {
      const users = await User.find().select("-password");
      return res.json(users);
    } catch (e) {
      console.log(e);
    }
  }
);

app.get(
  "/users/:id",
  async (req: Request, res: Response): Promise<Response<IUser> | void> => {
    try {
      const user = await User.findById(req.params.id);
      res.json(user);
    } catch (e) {
      console.log(e);
    }
  }
);

app.post(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser> | void> => {
    try {
      const createdUser = await User.create(req.body);
      return res.status(201).json(createdUser);
    } catch (e) {
      console.log(e);
    }
  }
);

app.put(
  "/users/:id",
  async (req: Request, res: Response): Promise<Response<IUser> | void> => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { returnDocument: "after" }
      );
      res.json(updatedUser);
    } catch (e) {
      console.log(e);
    }
  }
);

app.delete(
  "/users/:id",
  async (req: Request, res: Response): Promise<Response<IUser> | void> => {
    try {
      const updatedUser = await User.findByIdAndDelete(req.params.id);
      res.json(updatedUser);
    } catch (e) {
      console.log(e);
    }
  }
);

app.listen(configs.PORT, () => {
  mongoose.connect(configs.DB_URL as string);
  console.log(`Server has started on port ${configs.PORT}`);
});
