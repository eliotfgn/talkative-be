import { UserDto } from "./user.dto";
import { User } from "@prisma/client";

class UserService {
  async create(user: UserDto): Promise<Partial<UserDto>> {

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