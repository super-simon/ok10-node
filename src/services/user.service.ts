import { User } from "../models/User.model";
import { userRepository } from "../repositories/user.repository";
import { IUser, IUserWithoutPassword } from "../types/user.type";
import { ApiError } from "../errors";

class UserService {
  public async findAll(): Promise<IUserWithoutPassword[]> {
    try {
      return User.find().select("-password");
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async create(data: IUser): Promise<IUser> {
    return userRepository.create(data);
  }

  public async findById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }

  public async updateById(id: string, data: IUser): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    });
  }

  public async deleteById(id: string): Promise<IUser | null> {
    return User.findByIdAndDelete(id);
  }
}

export const userService = new UserService();
