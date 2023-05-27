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
const account_repository_1 = __importDefault(require("../../repositories/account.repository"));
const password_util_1 = require("../../utils/password.util");
const profile_repository_1 = __importDefault(require("../../repositories/profile.repository"));
const user_error_1 = require("../../errors/user.error");
const user_dto_1 = require("./user.dto");
class UserService {
    constructor() { }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            user_dto_1.AccountDto.parse(payload.account);
            user_dto_1.ProfileDto.parse(payload.profile);
            if (yield this.emailExist(payload.account.email)) {
                throw new user_error_1.EmailExistsError(payload.account.email);
            }
            if (yield this.usernameExist(payload.profile.username)) {
                throw new user_error_1.UsernameExistsError(payload.profile.username);
            }
            payload.account.password = yield (0, password_util_1.hashPassword)(payload.account.password);
            const data = yield account_repository_1.default.create({
                data: Object.assign(Object.assign({}, payload.account), { profile: {
                        create: payload.profile,
                    } }),
                include: {
                    profile: true,
                },
            });
            return Object.assign(Object.assign({}, data.profile), { email: data.email });
        });
    }
    emailExist(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield account_repository_1.default.findFirst({
                where: {
                    email: email,
                },
            });
            return !!account;
        });
    }
    usernameExist(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield profile_repository_1.default.findFirst({
                where: {
                    username: username,
                },
            });
            return !!profile;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield account_repository_1.default.findMany({
                include: {
                    profile: true,
                },
            });
            return users.map((user) => (Object.assign({ email: user.email }, user.profile)));
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield account_repository_1.default.findFirstOrThrow({
                where: {
                    id: id,
                },
                include: {
                    profile: true,
                },
            });
            if (!user.profile)
                return null;
            return Object.assign(Object.assign({}, user.profile), { email: user.email });
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield account_repository_1.default.findFirst({
                where: {
                    email: email,
                },
            });
        });
    }
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield profile_repository_1.default.findFirstOrThrow({
                where: {
                    username: username,
                },
                include: {
                    account: true,
                },
            });
            if (!user.account)
                return null;
            return Object.assign(Object.assign({}, user), { email: user.account.email });
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield profile_repository_1.default.update({
                where: {
                    accountId: id,
                },
                data: payload,
            });
            return this.findById(id);
        });
    }
    updatePassword(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield (0, password_util_1.hashPassword)(password);
            yield account_repository_1.default.update({
                where: {
                    id: id,
                },
                data: {
                    password: hashedPassword,
                },
            });
        });
    }
    updateEmail(id, email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.emailExist(email)) {
                throw new user_error_1.EmailExistsError(email);
            }
            yield account_repository_1.default.update({
                where: {
                    id: id,
                },
                data: {
                    email: email,
                },
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield account_repository_1.default.delete({
                where: {
                    id: id,
                },
            });
            return true;
        });
    }
}
exports.default = UserService;
