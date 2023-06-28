import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { User } from "../models/User.model";
import { IUser } from "../types/user.type";

class UserMiddleware {
  public findAndThrow(field: keyof IUser) {
    return async (
      req: Request,
      _res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const user = await User.findOne({ [field]: req.body[field] }).select(
          "password"
        );
        if (user) {
          throw new ApiError("User with this email is already exists", 409);
        }

        req.res.locals.user = user;

        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public isUserExist<T>(field: keyof T) {
    return async (
      req: Request,
      _res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const user = await User.findOne({ [field]: req.body[field] }).select(
          "password name"
        );
        if (!user) {
          throw new ApiError("User not found", 422);
        }

        req.res.locals.user = user;
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const userMiddleware = new UserMiddleware();
