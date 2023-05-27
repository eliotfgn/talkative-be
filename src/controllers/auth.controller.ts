import AuthService from '../services/auth/auth.service';
import { Request, Response } from 'express';
import { User, UserResponse } from '../types/user';
import { EmailExistsError, UsernameExistsError } from '../errors/user.error';
import { ErrorResponse } from '../types/error';

class AuthController {
  authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(request: Request, response: Response) {
    const payload: User = request.body;
    let userResponse: UserResponse | ErrorResponse;

    try {
      userResponse = await this.authService.register(payload);
    } catch (error) {
      if (error instanceof UsernameExistsError || error instanceof EmailExistsError) {
        userResponse = {
          success: false,
          status: 400,
          message: error.message,
        };
        response.status(400).json(userResponse);
      } else {
        userResponse = {
          success: false,
          status: 500,
          message: 'An unexpected error occurs.',
        };
        response.status(500).json(userResponse);
      }
    }

    response.status(201).json(userResponse);
  }
}

export default AuthController;
