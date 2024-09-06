import type {
  User,
  RegisterUserSchema,
  UpdateUserSchema,
  MeResponse,
} from '../../types/user';

interface IUserAdapter {
  getCurrentUser(): Promise<MeResponse>;
  register(user: RegisterUserSchema): Promise<User>;
  updateUser(user: UpdateUserSchema): Promise<User>;
  validateEmail(otpCode: string, email: string): Promise<void>;
  validatePhone(otpCode: string, phone: string): Promise<void>;
}

export type { IUserAdapter };
