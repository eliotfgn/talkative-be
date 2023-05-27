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
const auth_service_1 = __importDefault(require("../services/auth/auth.service"));
const user_error_1 = require("../errors/user.error");
const auth_error_1 = require("../errors/auth.error");
const logger_1 = __importDefault(require("../utils/logger"));
const zod_1 = require("zod");
class AuthController {
    constructor() {
        this.register = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const payload = request.body;
            let userResponse;
            try {
                userResponse = yield this.authService.register(payload);
                response.status(201).json({
                    success: true,
                    message: 'Successfully registered.',
                    data: userResponse,
                });
                logger_1.default.info('Successfully registered: ' + userResponse.accountId);
            }
            catch (error) {
                if (error instanceof user_error_1.UsernameExistsError || error instanceof user_error_1.EmailExistsError) {
                    userResponse = {
                        success: false,
                        status: 400,
                        message: error.message,
                    };
                    response.status(400).json(userResponse);
                }
                else if (error instanceof zod_1.ZodError) {
                    const errorPayload = error.errors.map((error) => {
                        return {
                            field: error.path[0],
                            message: error.message,
                            code: error.code,
                        };
                    });
                    const errorResponse = {
                        success: false,
                        status: 400,
                        message: 'Invalid parameters',
                        data: errorPayload,
                    };
                    response.status(400).json(errorResponse);
                }
                else {
                    const e = error;
                    userResponse = {
                        success: false,
                        status: 500,
                        message: 'An unexpected error occurs.',
                    };
                    response.status(500).json(userResponse);
                    logger_1.default.error('Error when creating user.');
                    logger_1.default.error(e.message);
                }
            }
        });
        this.login = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const payload = request.body;
            let token;
            try {
                token = yield this.authService.login(payload);
                response.status(200).json({
                    success: true,
                    message: 'Successfully authenticated.',
                    data: {
                        token: token,
                    },
                });
                logger_1.default.info('Successfull login!');
            }
            catch (error) {
                if (error instanceof auth_error_1.IncorrectPasswordError) {
                    response.status(403).json({
                        success: false,
                        status: 403,
                        message: 'Incorrect password.',
                    });
                }
                else if (error instanceof user_error_1.UserNotFoundError) {
                    response.status(404).json({
                        success: false,
                        status: 404,
                        message: 'User not found.',
                    });
                }
                else {
                    const e = error;
                    logger_1.default.error('Error occurs when logging.');
                    logger_1.default.error(e.message);
                }
            }
        });
        this.authService = new auth_service_1.default();
    }
}
exports.default = AuthController;
