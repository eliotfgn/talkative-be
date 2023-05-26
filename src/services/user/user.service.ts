import { User, UserResponse } from '../../types/user';
import accountRepository from '../../repositories/account.repository';
import { hashPassword } from '../../utils/password.util';
import { Account, Profile } from '@prisma/client';
import profileRepository from '../../repositories/profile.repository';
import { EmailExistsError, UsernameExistsError } from '../../errors/user.error';
import { AccountDto, ProfileDto, ProfileDtoType } from './user.dto';

class UserService {
  async create(payload: User): Promise<ProfileDtoType> {
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

  async findByEmail(email: string): Promise<UserResponse | null> {
    const user = await accountRepository.findFirstOrThrow({
      where: {
        email: email,
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

  async update(id: string): Promise<any> {}

  async delete(id: string): Promise<any> {}
}

export default UserService;
