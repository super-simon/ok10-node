import { ApiError } from "../errors";
import { User } from "../models/User.model";
import { userRepository } from "../repositories/user.repository";
import { IUser, IUserWithoutPassword } from "../types/user.type";

class UserService {
  public async findAll(): Promise<IUserWithoutPassword[]> {
    return await User.find();
  }

  public async create(data: IUser): Promise<IUser> {
    return await userRepository.create(data);
  }

  public async findById(id: string): Promise<IUser | null> {
    return await this.getOneByIdOrThrow(id);
  }

  public async updateById(id: string, data: IUser): Promise<IUser | null> {
    await this.getOneByIdOrThrow(id);

    return await User.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    });
  }

  public async deleteById(id: string): Promise<IUser | null> {
    await this.getOneByIdOrThrow(id);

    return await User.findByIdAndDelete(id);
  }

  private async getOneByIdOrThrow(userId: string): Promise<IUser> {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError("User does not exists", 422);
    }
    return user;
  }
}

export const userService = new UserService();
