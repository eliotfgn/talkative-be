import { User, UserResponse } from '../../types/user';
import accountRepository from '../../repositories/account.repository';
import { hashPassword } from '../../utils/password.util';
import { Account, Profile } from '@prisma/client';
import profileRepository from '../../repositories/profile.repository';
import { EmailExistsError, UsernameExistsError } from '../../errors/user.error';
import { AccountDto, ProfileDto, ProfileDtoType } from './user.dto';

class UserService {
  async create(payload: User): Promise<UserResponse> {
    AccountDto.parse(payload.account);
    ProfileDto.parse(payload.profile);

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

    return {
      ...data.profile!,
      email: data.email,
    };
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

  async findAll(): Promise<UserResponse[]> {
    const users = await accountRepository.findMany({
      include: {
        profile: true,
      },
    });

    return users.map((user) => ({
      email: user.email,
      ...user.profile!,
    }));
  }

  async findById(id: string): Promise<UserResponse | null> {
    const user = await accountRepository.findFirstOrThrow({
      where: {
        id: id,
      },
      include: {
        profile: true,
      },
    });

    if (!user.profile) return null;

    return {
      ...user.profile,
      email: user.email,
    };
  }

  async findByEmail(email: string): Promise<Account | null> {
    return await accountRepository.findFirst({
      where: {
        email: email,
      },
    });
  }

  async findByUsername(username: string): Promise<UserResponse | null> {
    const user = await profileRepository.findFirstOrThrow({
      where: {
        username: username,
      },
      include: {
        account: true,
      },
    });

    if (!user.account) return null;

    return {
      ...user,
      email: user.account.email,
    };
  }

  async update(id: string, payload: ProfileDtoType): Promise<UserResponse | null> {
    const data = await profileRepository.update({
      where: {
        accountId: id,
      },
      data: payload,
    });

    return this.findById(id);
  }

  async updatePassword(id: string, password: string): Promise<void> {
    const hashedPassword: string = await hashPassword(password);

    await accountRepository.update({
      where: {
        id: id,
      },
      data: {
        password: hashedPassword,
      },
    });
  }

  async updateEmail(id: string, email: string): Promise<void> {
    if (await this.emailExist(email)) {
      throw new EmailExistsError(email);
    }

    await accountRepository.update({
      where: {
        id: id,
      },
      data: {
        email: email,
      },
    });
  }

  async delete(id: string): Promise<boolean> {
    await accountRepository.delete({
      where: {
        id: id,
      },
    });

    return true;
  }
}

export default UserService;
