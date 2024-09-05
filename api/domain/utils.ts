import { AuthCredentials } from './types/login';

function validateUserData(credentials: AuthCredentials): void {
  if (!credentials.contact) {
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

export { validateUserData };
