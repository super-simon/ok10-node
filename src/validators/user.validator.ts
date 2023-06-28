import Joi from "joi";

import { regexConstants } from "../constants/regex.constants";
import { EGenders } from "../eums/user.enum";

export class UserValidator {
  static userName = Joi.string().min(3).max(30).trim();
  static age = Joi.number().min(0).max(150);
  static gender = Joi.valid(...Object.values(EGenders));
  static email = Joi.string()
    .email({ tlds: { allow: false } })
    .lowercase()
    .trim();
  static password = Joi.string().regex(regexConstants.PASSWORD);

  static create = Joi.object({
    name: this.userName.required(),
    age: this.age.required(),
    gender: this.gender.required(),
    email: this.email.required(),
    password: this.password.required(),
  });

  static update = Joi.object({
    name: this.userName,
    age: this.age,
    gender: this.gender,
  });

  static login = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });

  static changePassword = Joi.object({
    oldPassword: this.password.required(),
    newPassword: this.password.required(),
  });
}
