import { Request, Response } from 'express';
import UserService from '../services/user/user.service';
import logger from '../utils/logger';

class UserController {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getAll(req: Request, res: Response) {}

  async getById(req: Request, res: Response) {}

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
