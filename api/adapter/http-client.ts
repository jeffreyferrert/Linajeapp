import axios from 'axios';
import { SessionAdapter } from './session-adapter';

const variables = {
  API_BASE_URL: 'https://api.linajeapp.com',
  API_TIMEOUT: parseInt(process.env.REACT_APP_API_TIMEOUT || '5000'),
};

class HttpClient {
  instance: any;
  sessionAdapter = new SessionAdapter();
  useCsrf = false;

  constructor() {
    this.instance = axios.create({
      baseURL: `${variables.API_BASE_URL}/api/`,
      timeout: variables.API_TIMEOUT,
      withCredentials: true,
    });

    this.initializeInterceptors();
  }

  initializeInterceptors() {
    this.instance.interceptors.request.use((config: any) => {
      // Configurar siempre el token de autenticación
      const token = this.sessionAdapter.getValue('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.instance.interceptors.response.use(
      (response: any) => response,
      (error: any) => {
        if (error.response && error.response.status === 401) {
          // TODO: Implementar un mensaje de error
        }
        return Promise.reject(error);
      },
    );
  }

  async get(url: string, params?: any) {
    return this.instance.get(url, { params });
  }

  async post(url: string, data: any) {
    return this.instance.post(url, data);
  }

  async put(url: string, data: any) {
    return this.instance.put(url, data);
  }

  async patch(url: string, data: any) {
    return this.instance.patch(url, data);
  }

  async delete(url: string) {
    return this.instance.delete(url);
  }
}

const httpClient = new HttpClient();

class LogedInHttpClient extends HttpClient {}

export { HttpClient, LogedInHttpClient, httpClient };
