type AuthCredentials = {
  provider: 'email' | 'phone';
  contact: string;
  password: string;
};

type LoginResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
};

export type { AuthCredentials, LoginResponse };
