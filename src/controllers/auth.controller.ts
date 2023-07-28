import { ZodError } from 'zod';
import type { Request, Response } from 'express';
import AuthService from '../services/auth/auth.service';
import { User } from '../types/user';
import { EmailExistsError, UsernameExistsError, UserNotFoundError } from '../errors/user.error';
import { IncorrectPasswordError } from '../errors/auth.error';
import logger from '../utils/logger';

class AuthController {
  authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public async register(request: Request, response: Response): Promise<void> {
    const userPayload: User = request.body;

    try {
      const userResponse = await this.authService.register(userPayload);
      
      response.status(201).json({
        success: true,
        message: 'Successfully registered.',
        data: userResponse,
      });
    } catch (error) {
      if (error instanceof UsernameExistsError || error instanceof EmailExistsError) {
        response.status(400).json({
          success: false,
          status: 400,
          message: error.message,
        });
        
        return;
      }
      
      if (error instanceof ZodError) {
        const errorPayload = error.errors.map((error) => {
          return {
            field: error.path[0],
            message: error.message,
            code: error.code,
          };
        });

        response.status(400).json({
          success: false,
          status: 400,
          message: 'Invalid parameters',
          data: errorPayload,
        });
        
        return;
      }
      
      response.status(500).json({
        success: false,
        status: 500,
        message: 'An unexpected error occurs.',
      });
      
      logger.error((error as Error).message);
    }
  };

  async login(request: Request, response: Response): Promise<void> {
    const payload: { email: string; password: string } = request.body;
    
    try {
      const token = await this.authService.login(payload);

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
        
        return;
      }
      
      if (error instanceof UserNotFoundError) {
        response.status(404).json({
          success: false,
          status: 404,
          message: 'User not found.',
        });
        
        return;
      }

      logger.error((error as Error).message);
    }
  };
}

export default AuthController;
