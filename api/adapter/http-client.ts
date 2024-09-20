import axios from 'axios';
import { SessionAdapter } from './session-adapter';
import { SecureSessionStorage } from './secure-session-adapter';
import { router } from 'expo-router';

// TODO: Move to .env
const variables = {
  API_BASE_URL: 'http://192.168.3.52:8000',
  API_TIMEOUT: parseInt(process.env.REACT_APP_API_TIMEOUT || '5000'),
};

class HttpClient {
  instance: any;
  sessionAdapter = new SessionAdapter();
  secureSessionAdapter = new SecureSessionStorage();
  useCsrf = false;

  constructor() {
    this.instance = axios.create({
      baseURL: `${variables.API_BASE_URL}/api/`,
      timeout: variables.API_TIMEOUT,
      withCredentials: true,
    });

    this.initializeInterceptors();
  }

  async initializeInterceptors() {
    this.instance.interceptors.request.use(async (config: any) => {
      const requiresAuth = config.requiresAuth ?? true;

      if (requiresAuth) {
        const token = await this.secureSessionAdapter.getValue('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      return config;
    });

    this.instance.interceptors.response.use(
      (response: any) => response,
      async (error: any) => {
        if (error.response && error.response.status === 401) {
          console.log('Error 401', error);
          await this.secureSessionAdapter.removeValue('token');
          await this.sessionAdapter.flush();
          router.push('/sign-in');
        }
        console.log('Error en la petición', error);
        return Promise.reject(error);
      },
    );
  }

  async get(url: string, params?: any, requiresAuth = true) {
    return this.instance.get(url, { params, requiresAuth });
  }

  async post(url: string, data: any, requiresAuth = true) {
    console.log('Post', url, data);
    return this.instance.post(url, data, { requiresAuth });
  }

  async put(url: string, data: any, requiresAuth = true) {
    return this.instance.put(url, data, { requiresAuth });
  }

  async patch(url: string, data: any, requiresAuth = true) {
    return this.instance.patch(url, data, { requiresAuth });
  }

  async delete(url: string, requiresAuth = true) {
    return this.instance.delete(url, { requiresAuth });
  }
}

const httpClient = new HttpClient();

export { HttpClient, httpClient };
