import { User } from '../../types/user';
import accountRepository from '../../repositories/account.repository';
import { hashPassword } from '../../utils/password.util';
import { Account, Profile } from '@prisma/client';
import profileRepository from '../../repositories/profile.repository';

class UserService {
  async create(payload: User): Promise<any> {
    payload.account.password = await hashPassword(payload.account.password);

    accountRepository.create({
      data: {
        ...payload.account,
        profile: {
          create: payload.profile,
        },
      },
    });
  }

  async emailExist(email: string): Promise<boolean> {
    const account: Account | null = await accountRepository.findFirst({
      where: {
        email: email,
      },
    });

    return !!account;
  }

  async usernameExist(username: string): Promise<boolean> {
    const profile: Profile | null = await profileRepository.findFirst({
      where: {
        username: username,
      },
    });

    return !!profile;
  }

  // @ts-ignore
  async findAll(): Promise<any[]> {}

  async findById(id: string): Promise<any> {}

  async findByEmail(email: string): Promise<any> {}

  async update(id: string): Promise<any> {}

  async delete(id: string): Promise<any> {}
}

export default UserService;
