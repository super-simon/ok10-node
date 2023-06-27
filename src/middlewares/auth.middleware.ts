import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { ETokenType } from "../eums/token-type";
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

      tokenService.checkToken(accessToken, ETokenType.Access);

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

  public async checkRefreshToken(
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const refreshToken = req.get("Authorization");

      if (!refreshToken) {
        throw new ApiError("Authorization required", 401);
      }

      const payload = tokenService.checkToken(refreshToken, ETokenType.Refres);

      const tokenEntity = await Token.findOne({ refreshToken });
      if (!tokenEntity) {
        throw new ApiError("Authorization is not valid", 401);
      }

      req.res.locals.tokenPayload = { name: payload.name, _id: payload._id };
      req.res.locals.oldTokenPair = tokenEntity;

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
