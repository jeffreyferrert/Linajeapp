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

export type { User };
