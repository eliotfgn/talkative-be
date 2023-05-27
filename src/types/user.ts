import { AccountDtoType, ProfileDtoType } from '../services/user/user.dto';
import { Profile } from '@prisma/client';

export interface User {
  account: AccountDtoType;
  profile: ProfileDtoType;
}

export type UserResponse = { email: string } & Profile;
