import { z } from 'zod';

const AccountDto = z.object({
  email: z.string().email('Invalid email format.'),
  password: z
    .string()
    .min(8, 'Password should have at least 8 characteres.')
    .regex(
      new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]'),
      'Password must have alphanumeric characters and at least one special character.',
    ),
});

type AccountDtoType = z.infer<typeof AccountDto>;

const ProfileDto = z.object({
  username: z.string().min(3, 'Username must have at least 3 characteres.'),
  firstname: z.string(),
  lastname: z.string(),
  profilePic: z.string(),
});

type ProfileDtoType = z.infer<typeof ProfileDto>;

export { AccountDto, AccountDtoType, ProfileDto, ProfileDtoType };
