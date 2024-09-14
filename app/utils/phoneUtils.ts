import { parsePhoneNumberFromString } from 'libphonenumber-js';
const formatPhoneToE164 = (phone: string): string => {
  let phoneNumber = parsePhoneNumberFromString(phone, 'PE'); // 'PE' es el código de país de Perú
  if (phoneNumber) {
    return phoneNumber.format('E.164');
  } else {
    throw new Error('Número de teléfono inválido');
  }
};

export { formatPhoneToE164 };
