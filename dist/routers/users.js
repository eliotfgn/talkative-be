"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const router = (0, express_1.Router)();
const userController = new user_controller_1.default();
router.get("/", userController.getAll);
router.get("/me", userController.getConnectedUser);
router.get("/:id", userController.getById);
router.put("/:id", userController.update);
router.delete("/:id", userController.remove);
exports.default = router;
