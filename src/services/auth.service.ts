import { ApiError } from "../errors";
import { EEmailActions } from "../eums/email.enum";
import { OldPassword } from "../models/OldPassword.model";
import { Token } from "../models/Token.model";
import { User } from "../models/User.model";
import { ICredentials, ITokenPair, ITokenPayload } from "../types/token.types";
import { IUser } from "../types/user.type";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(data: IUser): Promise<void> {
    try {
      const hashedPassword = await passwordService.hash(data.password);

      await User.create({ ...data, password: hashedPassword });
      await emailService.sendMail(data.email, EEmailActions.WELLCOME, {
        name: data.name,
      });
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

      const tokenPair = tokenService.generateTokenPair({
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

  public async refresh(
    oldTokenPair: ITokenPair,
    tokenPayload: ITokenPayload
  ): Promise<ITokenPair> {
    try {
      const tokenPair = tokenService.generateTokenPair(tokenPayload);

      await Promise.all([
        Token.deleteOne({ refreshToken: oldTokenPair.refreshToken }),
        Token.create({ _userId: tokenPayload._id, ...tokenPair }),
      ]);

      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async changePassword(
    dto: { oldPassword: string; newPassword: string },
    userId: string
  ): Promise<void> {
    try {
      const oldPasswords = await OldPassword.find({ _userId: userId });
      await Promise.all(
        oldPasswords.map(async ({ password: hash }) => {
          const isMatched = await passwordService.compare(
            dto.oldPassword,
            hash
          );
          if (isMatched) {
            throw new ApiError("New Password used to be used", 400);
          }
        })
      );

      const user = await User.findById(userId).select("password");

      const isMatched = await passwordService.compare(
        dto.oldPassword,
        user.password
      );

      if (!isMatched) {
        throw new ApiError("Wrong old password", 400);
      }

      const newHash = await passwordService.hash(dto.newPassword);
      await Promise.all([
        OldPassword.create({ _userId: userId, password: user.password }),
        User.updateOne({ _id: userId }, { password: newHash }),
      ]);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
