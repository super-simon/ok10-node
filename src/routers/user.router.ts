import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { userMiddleware } from "../moddlewares/user.middleware";

const router = Router();

router.get("/", userController.findAll);

router.post("/", userMiddleware.isCreateValid, userController.create);

router.get("/:id", userController.findById);

router.put("/:id", userController.updateById);

router.delete("/users/:id", userController.deleteById);

export const userRouter = router;
