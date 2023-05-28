import { Request, Response } from 'express';
import UserService from '../services/user/user.service';
import logger from '../utils/logger';
import { UserResponse } from '../types/user';
import { ProfileDtoType } from '../services/user/user.dto';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';

class UserController {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const users: UserResponse[] = await this.userService.findAll();
      res.status(200).json({
        success: true,
        message: 'User retrieved successfully.',
        data: users,
      });
    } catch (error) {
      const e = error as Error;
      res.status(500).json({
        success: false,
        message: 'An unexpected error occurs',
      });

      logger.error(e.message);
    }
  };

  getById = async (request: Request, response: Response) => {
    const id: string = request.params.id;
    try {
      const user: UserResponse | null = await this.userService.findById(id);

      if (user) {
        response.status(200).send({
          success: true,
          status: 200,
          message: 'User retrieved successfully',
          data: user,
        });
      } else {
        response.status(404).send({
          success: false,
          status: 404,
          message: 'User profile not found.',
        });
      }
    } catch (error) {
      response.status(404).send({
        success: false,
        status: 404,
        message: `User with id ${id} not found.`,
      });
    }
  };

  getConnectedUser = async (req: Request, res: Response) => {
    // @ts-ignore
    const userId: string = req.user;
    let userResponse;

    try {
      userResponse = await this.userService.findById(userId);

      if (userResponse) {
        res.status(200).json({
          success: true,
          message: 'User successfully retrieved.',
          data: userResponse,
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'User not found.',
        });
      }
    } catch (error) {
      const e = error as Error;
      res.status(500).json({
        success: false,
        message: 'An unexpected error occurs.',
      });
      logger.error(e.message);
    }
  };

  update = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const payload: ProfileDtoType = req.body;

    try {
      const data = await this.userService.update(id, payload);

      res.status(200).json({
        success: true,
        status: 200,
        data: data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(404).json({
          success: false,
          status: 404,
          message: 'User to update not found.',
        });
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

        res.status(400).json(errorResponse);
      } else {
        res.status(500).json({
          success: false,
          status: 500,
          message: 'An unexpected error occurs',
        });

        //@ts-ignore
        logger.log(error.message);
      }
    }
  };

  updatePassword = async (request: Request, response: Response) => {
    //TODO
  };

  remove = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    //@ts-ignore
    const authenticatedUser: string = req.user;

    if (authenticatedUser === id) {
      //...
    }

    try {
      const success: boolean = await this.userService.delete(id);

      res.status(200).json({
        success: success,
        message: `User with id ${id} successfully deleted`,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        status: 500,
        message: 'An unexpected error occurs',
      });
    }
  };
}

export default UserController;
