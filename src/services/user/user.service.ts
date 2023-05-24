import { UserDto } from './user.dto';
import { validate } from 'class-validator';
import { Prisma, User } from '@prisma/client';
import userRepository from '../../repositories/user.repository';

class UserService {
  async create(payload: UserDto): Promise<User> {
    validate(payload).then((error) => {});

    const user: Prisma.UserCreateInput = {
      username: payload.username,
      email: payload.email,
      password: payload.password,
      firstname: payload.firstname,
      lastname: payload.lastname,
      profilePic: payload.profilePic,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return userRepository.create({
      data: user,
    });
  }

  async findAll(): Promise<any[]> {
    let users: {
      createdAt: Date;
      firstname: string | null;
      profilePic: string | null;
      id: string;
      email: string;
      username: string;
      lastname: string | null;
      updatedAt: Date;
    }[];

    const data = await userRepository.findMany();

    users = data.map((user) => {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        profilePic: user.profilePic,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    });
    return users;
  }

  async findById(id: string): Promise<Partial<UserDto>> {}

  async findByEmail(email: string): Promise<Partial<UserDto>> {}

  async update(id: string, user: UserDto): Promise<Partial<UserDto>> {}

  async delete(id: string): Promise<boolean> {}
}

export default UserService;
