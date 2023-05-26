import { User } from '../../types/user';
import accountRepository from '../../repositories/account.repository';
import { hashPassword } from '../../utils/password.util';
import { Account, Profile } from '@prisma/client';
import profileRepository from '../../repositories/profile.repository';
import { EmailExistsError, UsernameExistsError } from '../../errors/user.error';
import { ProfileDtoType } from './user.dto';

class UserService {
  async create(payload: User): Promise<ProfileDtoType> {
    if (await this.emailExist(payload.account.email)) {
      throw new EmailExistsError(payload.account.email);
    }

    if (await this.usernameExist(payload.profile.username)) {
      throw new UsernameExistsError(payload.profile.username);
    }

    payload.account.password = await hashPassword(payload.account.password);

    const data = await accountRepository.create({
      data: {
        ...payload.account,
        profile: {
          create: payload.profile,
        },
      },
      include: {
        profile: true,
      },
    });

    return payload.profile;
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
