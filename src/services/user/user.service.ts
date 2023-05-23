import { UserDto } from "./user.dto";
import { validate } from "class-validator";
import { Prisma, User } from "@prisma/client";
import userRepository from "../../repositories/user.repository";

class UserService {
  async create(payload: UserDto): Promise<User> {
    validate(payload).then(error => { });

    const user: Prisma.UserCreateInput = {
      username: payload.username,
      email: payload.email,
      password: payload.password,
      firstname: payload.firstname,
      lastname: payload.lastname,
      profilePic: payload.profilePic,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return userRepository.create({
      data: user
    });
  }

  async findAll(): Promise<Partial<UserDto>[]> {

  }

  async findById(id: string): Promise<Partial<UserDto>> {

  }

  async findByEmail(email: string): Promise<Partial<UserDto>> {

  }

  async update(id: string, user: UserDto): Promise<Partial<UserDto>> {

  }

  async delete(id: string): Promise<boolean> {

  }
}

export default UserService;