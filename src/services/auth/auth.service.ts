import UserService from '../user/user.service';
import { User, UserResponse } from '../../types/user';

class AuthService {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async register(payload: User): Promise<UserResponse> {
    return await this.userService.create(payload);
  }
}
