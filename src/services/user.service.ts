import { ApiError } from "../errors";
import { User } from "../models/User.model";
import { userRepository } from "../repositories/user.repository";
import { IUser, IUserWithoutPassword } from "../types/user.type";

class UserService {
  public async findAll(): Promise<IUserWithoutPassword[]> {
    try {
      console.log(await User.find().select("-password"));
      console.log(User.find().select("-password"));
      return await User.find().select("-password");
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async create(data: IUser): Promise<IUser> {
    return await userRepository.create(data);
  }

  public async findById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  public async updateById(id: string, data: IUser): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    });
  }

  public async deleteById(id: string): Promise<IUser | null> {
    return await User.findByIdAndDelete(id);
  }
}

export const userService = new UserService();
