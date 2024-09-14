import { AuthCredentials } from './types/login';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import type { CountryCode } from 'libphonenumber-js/types';
const formatPhoneToE164 = (phone: string, country: CountryCode): string => {
  let phoneNumber = parsePhoneNumberFromString(phone, country); // 'PE' es el código de país de Perú
  if (phoneNumber) {
    return phoneNumber.format('E.164');
  } else {
    throw new Error('Número de teléfono inválido');
  }
};

function validateUserData(credentials: AuthCredentials): void {
  if (!credentials.email) {
    const message =
      credentials.provider === 'phone'
        ? 'El número de teléfono es requerido'
        : 'El correo electrónico es requerido';
    throw new Error(message);
  }

  if (!credentials.password) {
    throw new Error('La contraseña es requerida');
  }
}

export { validateUserData, formatPhoneToE164 };
