import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api/axios";
import { notifications } from "@/lib/services/notifications";
import { useAuth } from "@/lib/providers/AuthProvider";

interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

export function useLogin() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await api.post<LoginResponse>("/login", credentials);
      return response.data;
    },
    onSuccess: (data) => {
      login(data.token, data.user);
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "No se pudo iniciar sesión. Intenta nuevamente.";
      notifications.error(errorMessage);
    },
  });
}
