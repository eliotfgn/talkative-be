import { User } from '../../types/user';
import accountRepository from '../../repositories/account.repository';

class UserService {
  async create(payload: User): Promise<any> {
    accountRepository.create({
      data: {
        ...payload.account,
        profile: {
          create: payload.profile,
        },
      },
    });
  }

  // @ts-ignore
  async findAll(): Promise<any[]> {}

  async findById(id: string): Promise<any> {}

  async findByEmail(email: string): Promise<any> {}

  async update(id: string): Promise<any> {}

  async delete(id: string): Promise<any> {}
}

export default UserService;
