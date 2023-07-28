import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';
import type { Request, Response } from 'express';
import UserService from '../services/user/user.service';
import { ProfileDtoType } from '../services/user/user.dto';
import logger from '../utils/logger';

class UserController {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getAll(request: Request, response: Response): Promise<void> {
    try {
      const users = await this.userService.findAll();
      
      response.status(200).json({
        success: true,
        message: 'User retrieved successfully.',
        data: users,
      });
    } catch (error) {
      response.status(500).json({
        success: false,
        message: 'An unexpected error occurs',
      });

      logger.error((error as Error).message);
    }
  };

  async getById(request: Request, response: Response): Promise<void> {
    const id: string = request.params.id;
    
    try {
      const user = await this.userService.findById(id);

      if (!user) {
        response.status(404).send({
          success: false,
          status: 404,
          message: 'User profile not found.',
        });
        
        return;
      }
      
      response.status(200).send({
        success: true,
        status: 200,
        message: 'User retrieved successfully',
        data: user,
      });
    } catch (error) {
      response.status(404).send({
        success: false,
        status: 404,
        message: `User with id ${id} not found.`,
      });
    }
  };

  async getConnectedUser(request: Request, response: Response): Promise<void> {
    const userId: string = request.user;
    
    try {
      const userResponse = await this.userService.findById(userId);

      if (!userResponse) {
        response.status(404).json({
          success: false,
          message: 'User not found.',
        });
        
        return;
      }
      
      response.status(200).json({
        success: true,
        message: 'User successfully retrieved.',
        data: userResponse,
      });
    } catch (error) {
      response.status(500).json({
        success: false,
        message: 'An unexpected error occurs.',
      });
      
      logger.error((error as Error).message);
    }
  };

  async update(request: Request, response: Response): Promise<void> {
    const id: string = request.params.id;
    const payload: ProfileDtoType = request.body;

    try {
      const data = await this.userService.update(id, payload);

      response.status(200).json({
        success: true,
        status: 200,
        data: data,
      });
      
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        response.status(404).json({
          success: false,
          status: 404,
          message: 'User to update not found.',
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

        const errorResponse = {
          success: false,
          status: 400,
          message: 'Invalid parameters',
          data: errorPayload,
        };

        response.status(400).json(errorResponse);
        
        return;
      }
      
      
      response.status(500).json({
        success: false,
        status: 500,
        message: 'An unexpected error occurs',
      });

      logger.error(error.message);
    }
  };

  async updatePassword(request: Request, response: Response): Promise<void> {
    //TODO
  };

  async remove(request: Request, response: Response): Promise<void> {
    const id: string = request.params.id;
    const authenticatedUser: string = request.user;

    if (authenticatedUser === id) {
      //...
    }

    try {
      const success = await this.userService.delete(id);

      response.status(200).json({
        success: success,
        message: `User with id ${id} successfully deleted`,
      });
    } catch (error) {
      response.status(500).json({
        success: false,
        status: 500,
        message: 'An unexpected error occurs',
      });
    }
  };
}

export default UserController;
