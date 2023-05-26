import { AccountDtoType, ProfileDtoType } from '../services/user/user.dto';

export interface User {
  account: AccountDtoType;
  profile: ProfileDtoType;
}
