import { User } from "../models/User.model";
import { IUser, IUserWithoutPassword } from "../types/user.type";

class UserService {
  public async findAll(): Promise<IUserWithoutPassword[]> {
    return User.find().select("-password");
  }

  public async create(data: IUser): Promise<IUser> {
    return User.create(data);
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
