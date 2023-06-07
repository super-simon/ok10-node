import { Schema, model } from "mongoose";

import { EGenders } from "../eums/user.enum";

const userSchema = new Schema({
  name: { type: String },
  age: {
    type: Number,
    min: [0, "Min value for age is 0."],
    max: [150, "Max value for age is 150."],
  },
  gender: {
    type: String,
    enum: EGenders,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: true,
  },
});

export const User = model("user", userSchema);
