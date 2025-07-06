export interface User {
  id: string;
  email: string;
  username: string;
  role: "student" | "instructor" | "admin" | "super_admin";
  profile: {
    firstName: string;
    lastName: string;
    avatar?: string;
    phone?: string;
    country?: string;
  };
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isVerifying: boolean;
  error: string | null;
}

export interface LoginCredentials {
  identifier: string; // email or username
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  role: "student" | "instructor";
  country?: string;
  phone?: string;
}

export interface AuthResponse {
  jwt: string;
  user: User;
}
