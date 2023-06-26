import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { Token } from "../models/Token.model";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const accessToken = req.get("Authorization");

      if (!accessToken) {
        throw new ApiError("Authorization required", 401);
      }

      tokenService.checkToken(accessToken);

      const tokenEntity = await Token.findOne({ accessToken });

      if (!tokenEntity) {
        throw new ApiError("Authorization is not valid", 401);
      }

      // req.res.locals.tokenInfo = tokenEntity;

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
