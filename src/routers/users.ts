import { Router } from "express";
import UserController from "../controllers/user.controller";

const router: Router = Router();
const userController = new UserController();

router.get("/", userController.getAll);

router.get("/me", userController.getConnectedUser);

router.get("/:id", userController.getById);

router.put("/:id", userController.update);

router.delete("/:id", userController.remove);

export default router;
