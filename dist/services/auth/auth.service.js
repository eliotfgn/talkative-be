"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../user/user.service"));
const password_util_1 = require("../../utils/password.util");
const jwt_util_1 = require("../../utils/jwt.util");
const user_error_1 = require("../../errors/user.error");
const auth_error_1 = require("../../errors/auth.error");
class AuthService {
    constructor() {
        this.userService = new user_service_1.default();
    }
    register(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.create(payload);
        });
    }
    login(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.userService.findByEmail(payload.email);
            if (!account)
                throw new user_error_1.UserNotFoundError(payload.email);
            if (yield (0, password_util_1.compare)(payload.password, account.password)) {
                return (0, jwt_util_1.generateAccessToken)(account.id);
            }
            else {
                throw new auth_error_1.IncorrectPasswordError();
            }
        });
    }
}
exports.default = AuthService;
