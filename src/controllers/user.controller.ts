import { Request, Response } from 'express';
import UserService from '../services/user/user.service';
import logger from '../utils/logger';
import { UserResponse } from '../types/user';

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

  async update(req: Request, res: Response) {}

  async remove(req: Request, res: Response) {}
}

export default UserController;
