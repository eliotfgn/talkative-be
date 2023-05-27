import UserService from '../user/user.service';
import { User, UserResponse } from '../../types/user';
import { Account } from '@prisma/client';
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

  async login(payload: { email: string; password: string }) {
    const account: Account | null = await this.userService.findByEmail(payload.email);

    if (!account) throw new UserNotFoundError(payload.email);

    if (await compare(payload.password, account.password)) {
      return generateAccessToken(account.id);
    } else {
      throw new IncorrectPasswordError();
    }
  }
}
