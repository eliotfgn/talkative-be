import AuthService from '../services/auth/auth.service';
import { Request, Response } from 'express';
import { User, UserResponse } from '../types/user';
import { EmailExistsError, UsernameExistsError, UserNotFoundError } from '../errors/user.error';
import { ErrorResponse } from '../types/error';
import { IncorrectPasswordError } from '../errors/auth.error';

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

  async login(request: Request, response: Response) {
    const payload: { email: string; password: string } = request.body;
    let token: string;

    try {
      token = await this.authService.login(payload);

      response.status(200).json({
        success: true,
        message: 'Successfully authenticated.',
        data: {
          token: token,
        },
      });
    } catch (error) {
      if (error instanceof IncorrectPasswordError) {
        response.status(403).json({
          success: false,
          status: 403,
          message: 'Incorrect password.',
        });
      } else if (error instanceof UserNotFoundError) {
        response.status(404).json({
          success: false,
          status: 404,
          message: 'User not found.',
        });
      }
    }
  }
}

export default AuthController;
