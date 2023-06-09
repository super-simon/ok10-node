import jwt from "jsonwebtoken";

import { configs } from "../configs/config";
import { ApiError } from "../errors";
import { ETokenType } from "../eums/token-type";
import { ITokenPair, ITokenPayload } from "../types/token.types";

class TokenService {
  public generateTokenPair(payload: ITokenPayload): ITokenPair {
    const accessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET, {
      expiresIn: "10s",
    });
    const refreshToken = jwt.sign(payload, configs.JWT_REFRESH_SECRET, {
      expiresIn: "50d",
    });

    return { accessToken, refreshToken };
  }

  public checkToken(token: string, type: ETokenType): ITokenPayload {
    try {
      let secret: string;
      switch (type) {
        case ETokenType.Access:
          secret = configs.JWT_ACCESS_SECRET;
          break;
        case ETokenType.Refres:
          secret = configs.JWT_REFRESH_SECRET;
          break;
      }
      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token is not valid", 401);
    }
  }
}

export const tokenService = new TokenService();
