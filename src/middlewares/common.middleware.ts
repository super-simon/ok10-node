import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors";

class CommonMiddleware {
  public isIdValid(req: Request, _res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!isObjectIdOrHexString(id)) {
        throw new ApiError("Id is not valid", 400);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const commonMiddleware = new CommonMiddleware();
