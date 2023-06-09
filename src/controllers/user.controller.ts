import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { userService } from "../services/user.service";
import { IUser } from "../types/user.type";
import { UserValidator } from "../validators";

class UserController {
  public async findAll(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser[]> | void> {
    try {
      const users = await userService.findAll();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser> | void> {
    try {
      const createdUser = await userService.create(req.res.locals as IUser);
      return res.status(201).json(createdUser);
    } catch (e) {
      next(e);
    }
  }

  public async findById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser> | void> {
    try {
      const user = await userService.findById(req.params.userId);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  public async updateById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser> | void> {
    try {
      const { error, value } = UserValidator.update.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }

      const updatedUser = await userService.updateById(
        req.params.userId,
        value
      );
      res.json(updatedUser);
    } catch (e) {
      next(e);
    }
  }

  public async deleteById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser> | void> {
    try {
      const updatedUser = await userService.deleteById(req.params.userId);
      res.json(updatedUser);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
