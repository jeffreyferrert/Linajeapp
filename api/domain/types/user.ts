import type { CountryCode } from 'libphonenumber-js/types';
type User = {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  phone: string;
  birthdate: string; // O puedes usar Date si prefieres manejar fechas como objetos Date
  country: {
    code: string;
    name: string;
  };
  is_active: boolean;
  gender: string;
  onboarding_completed: boolean;
  terms_accepted: boolean;
  privacy_accepted: boolean;
  email_verified: boolean;
  phone_verified: boolean;
  is_validated: boolean;
  id: number;
};

type RegisterUserSchema = {
  email: string;
  first_name: string;
  last_name: string;
  username?: string;
  phone: string;
  birthdate: string;
  country: CountryCode;
  password: string;
};

type UpdateUserSchema = {
  email?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  phone?: string;
  birthdate?: string;
  country?: string;
  terms_accepted?: boolean;
  privacy_accepted?: boolean;
};

type MeResponse = {
  email: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  phone?: string;
  birthdate?: string;
  country?: string;
  is_active: boolean;
  email_verified: boolean;
  phone_verified: boolean;
  is_validated: boolean;
};

export type { User, RegisterUserSchema, UpdateUserSchema, MeResponse };
