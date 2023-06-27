import { model, Schema } from "mongoose";

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
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
});

export const User = model("user", userSchema);
