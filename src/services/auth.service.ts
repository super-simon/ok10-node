import { ApiError } from "../errors";
import { Token } from "../models/Token.model";
import { User } from "../models/User.model";
import { ICredentials, ITokenPair } from "../types/token.types";
import { IUser } from "../types/user.type";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(data: IUser): Promise<void> {
    try {
      const hashedPassword = await passwordService.hash(data.password);
      await User.create({ ...data, password: hashedPassword });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async login(
    credentials: ICredentials,
    user: IUser
  ): Promise<ITokenPair> {
    try {
      const isMatched = await passwordService.compare(
        credentials.password,
        user.password
      );

      if (!isMatched) {
        throw new ApiError("Invalid Email or password", 401);
      }

      const tokenPair = await tokenService.generateTokenPair({
        _id: user._id.toString(),
        name: user.name,
      });

      await Token.create({
        ...tokenPair,
        _userId: user._id,
      });

      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
