import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares";
import { authMiddleware } from "../middlewares/auth.middleware";
import { UserValidator } from "../validators";

const router = Router();

router.get("/", userController.findAll);

router.get(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  userController.findById
);

router.put(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.isBodyValid(UserValidator.update),
  userController.updateById
);

router.delete("/", authMiddleware.checkAccessToken, userController.deleteAll);

router.delete(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  userController.deleteById
);

export const userRouter = router;
