import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware, userMiddleware } from "../middlewares";

const router = Router();

router.get("/", userController.findAll);

router.post(
  "/",
  userMiddleware.isIdValid,
  commonMiddleware.isCreateValid,
  userController.create
);

router.get("/:id", userController.findById);

router.put("/:id", userController.updateById);

router.delete("/users/:id", userController.deleteById);

export const userRouter = router;
