"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundError = exports.UsernameExistsError = exports.EmailExistsError = void 0;
class EmailExistsError extends Error {
    constructor(email) {
        super(`User with email ${email} already exists.`);
        this.email = email;
    }
    getEmail() {
        return this.email;
    }
}
exports.EmailExistsError = EmailExistsError;
class UsernameExistsError extends Error {
    constructor(username) {
        super(`User with username ${username} already exists.`);
        this.username = username;
    }
    getUsername() {
        return this.username;
    }
}
exports.UsernameExistsError = UsernameExistsError;
class UserNotFoundError extends Error {
    constructor(email) {
        super(`User with email ${email} not found.`);
    }
}
exports.UserNotFoundError = UserNotFoundError;
