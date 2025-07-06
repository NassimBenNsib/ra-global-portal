import { api, API_ENDPOINTS, apiHelpers } from "./api";
import config from "@/config";
import {
  LoginCredentials,
  RegisterData,
  User,
  AuthResponse,
} from "@/types/auth";

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiHelpers.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    const { jwt, user } = response;

    if (jwt) {
      localStorage.setItem(config.storage.authToken, jwt);
    }

    return { jwt, user };
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiHelpers.post(API_ENDPOINTS.AUTH.REGISTER, data);
    const { jwt, user } = response;

    if (jwt) {
      localStorage.setItem(config.storage.authToken, jwt);
    }

    return { jwt, user };
  },

  async logout(): Promise<void> {
    localStorage.removeItem(config.storage.authToken);
    return Promise.resolve();
  },

  async getCurrentUser(): Promise<User> {
    return await apiHelpers.get(API_ENDPOINTS.USERS.PROFILE);
  },

  async verifyEmail(token: string) {
    return await apiHelpers.post(API_ENDPOINTS.AUTH.EMAIL_CONFIRMATION, {
      confirmation: token,
    });
  },

  async forgotPassword(email: string) {
    return await apiHelpers.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  },

  async resetPassword(
    password: string,
    passwordConfirmation: string,
    code: string
  ) {
    return await apiHelpers.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
      password,
      passwordConfirmation,
      code,
    });
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    return await apiHelpers.put(API_ENDPOINTS.USERS.UPDATE_PROFILE, data);
  },

  async uploadAvatar(file: File, onProgress?: (progress: number) => void) {
    return await apiHelpers.uploadFile(file, (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const progress = (progressEvent.loaded / progressEvent.total) * 100;
        onProgress(progress);
      }
    });
  },
};
