import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { AuthState, User, LoginCredentials, RegisterData } from "@/types/auth";
import { authService } from "@/lib/auth-api";

type AuthAction =
  | { type: "AUTH_START" }
  | { type: "AUTH_SUCCESS"; payload: User }
  | { type: "AUTH_ERROR"; payload: string }
  | { type: "LOGOUT" }
  | { type: "VERIFY_START" }
  | { type: "VERIFY_SUCCESS" }
  | { type: "CLEAR_ERROR" };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isVerifying: false,
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, isLoading: true, error: null };
    case "AUTH_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case "AUTH_ERROR":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case "VERIFY_START":
      return { ...state, isVerifying: true };
    case "VERIFY_SUCCESS":
      return { ...state, isVerifying: false };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Helper function to get dashboard route based on role
const getDashboardRoute = (role: string): string => {
  switch (role) {
    case "admin":
    case "super_admin":
      return "/admin/dashboard";
    case "instructor":
      return "/instructor/dashboard";
    case "student":
      return "/student/dashboard";
    default:
      return "/dashboard";
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();
  const location = useLocation();

  // Check for existing token on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("auth_token");

      if (!token) {
        dispatch({ type: "AUTH_ERROR", payload: "No token found" });
        return;
      }

      try {
        dispatch({ type: "VERIFY_START" });

        // Simulate verification delay for smooth animation
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const user = await authService.getCurrentUser();
        dispatch({ type: "AUTH_SUCCESS", payload: user });
        dispatch({ type: "VERIFY_SUCCESS" });

        // Redirect based on intended destination or role
        const from =
          location.state?.from?.pathname || getDashboardRoute(user.role);
        navigate(from, { replace: true });
      } catch (error) {
        dispatch({ type: "AUTH_ERROR", payload: "Session expired" });
        localStorage.removeItem("auth_token");
      }
    };

    initializeAuth();
  }, [navigate, location.state]);

  const login = async (credentials: LoginCredentials) => {
    try {
      dispatch({ type: "AUTH_START" });

      const { user } = await authService.login(credentials);
      dispatch({ type: "AUTH_SUCCESS", payload: user });

      toast.success(`Welcome back, ${user.profile.firstName}!`);

      // Redirect to intended destination or dashboard
      const from =
        location.state?.from?.pathname || getDashboardRoute(user.role);
      navigate(from, { replace: true });
    } catch (error: any) {
      const message = error.response?.data?.error?.message || "Login failed";
      dispatch({ type: "AUTH_ERROR", payload: message });
      toast.error(message);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      dispatch({ type: "AUTH_START" });

      const { user } = await authService.register(data);
      dispatch({ type: "AUTH_SUCCESS", payload: user });

      toast.success("Registration successful! Welcome to RA Global Education!");

      // Redirect to onboarding or dashboard
      navigate(getDashboardRoute(user.role), { replace: true });
    } catch (error: any) {
      const message =
        error.response?.data?.error?.message || "Registration failed";
      dispatch({ type: "AUTH_ERROR", payload: message });
      toast.error(message);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      dispatch({ type: "LOGOUT" });
      toast.success("Logged out successfully");
      navigate("/auth/login", { replace: true });
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
