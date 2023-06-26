import { Router } from "express";
import CategoryController from "../controllers/category.controller";

const router: Router = Router();
const categoryController: CategoryController = new CategoryController();

router.post('/', categoryController.create);

export default router;