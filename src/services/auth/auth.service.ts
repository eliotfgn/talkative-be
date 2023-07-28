import UserService from '../user/user.service';
import { User, UserResponse } from '../../types/user';
import type { LoginPayload  } from '../../types/auth';
import { compare } from '../../utils/password.util';
import { generateAccessToken } from '../../utils/jwt.util';
import { UserNotFoundError } from '../../errors/user.error';
import { IncorrectPasswordError } from '../../errors/auth.error';

class AuthService {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async register(payload: User): Promise<UserResponse> {
    return await this.userService.create(payload);
  }

  async login(payload: LoginPayload): Promise<string> {
    const account = await this.userService.findByEmail(payload.email);

    if (!account) {
      throw new UserNotFoundError(payload.email);
    }

    if (!(await compare(payload.password, account.password))) {
      throw new IncorrectPasswordError();
    }

    return generateAccessToken(account.id);
  }
}

export default AuthService;
