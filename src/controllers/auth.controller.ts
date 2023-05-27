import AuthService from '../services/auth/auth.service';
import { Request, Response } from 'express';
import { User, UserResponse } from '../types/user';
import { EmailExistsError, UsernameExistsError, UserNotFoundError } from '../errors/user.error';
import { ErrorResponse } from '../types/error';
import { IncorrectPasswordError } from '../errors/auth.error';
import logger from '../utils/logger';
import { ZodError } from 'zod';

class AuthController {
  authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public register = async (request: Request, response: Response) => {
    const payload: User = request.body;
    let userResponse: UserResponse | ErrorResponse;

    try {
      userResponse = await this.authService.register(payload);
      response.status(201).json(userResponse);
      logger.info('Successfully registered: ' + userResponse.accountId);
    } catch (error) {
      if (error instanceof UsernameExistsError || error instanceof EmailExistsError) {
        userResponse = {
          success: false,
          status: 400,
          message: error.message,
        };
        response.status(400).json(userResponse);
      } else if (error instanceof ZodError) {
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
      } else {
        const e = error as Error;
        userResponse = {
          success: false,
          status: 500,
          message: 'An unexpected error occurs.',
        };
        response.status(500).json(userResponse);
        logger.error('Error when creating user.');
        logger.error(e.message);
      }
    }
  };

  login = async (request: Request, response: Response) => {
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
      logger.info('Successfull login!');
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
      } else {
        const e = error as Error;
        logger.error('Error occurs when logging.');
        logger.error(e.message);
      }
    }
  };
}

export default AuthController;
