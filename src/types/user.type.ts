import { ObjectId } from "mongoose";

import { EGenders } from "../eums/user.enum";

export interface IUser {
  _id: ObjectId;
  name: string;
  age: number;
  gender: EGenders;
  email: string;
  password: string;
}
