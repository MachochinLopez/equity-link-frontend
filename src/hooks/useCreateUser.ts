import api from "@/lib/api/axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { notifications } from "@/lib/services/notifications";

interface CreateUserData {
  name: string;
  email: string;
  role: string;
  extra_permissions: string[];
}

interface CreateUserResponse {
  message: string;
  temporary_password: string;
}

export const useCreateUser = (
  onUserCreated?: (data: CreateUserResponse) => void
) => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: CreateUserData) => {
      const response = await api.post<CreateUserResponse>("/users", data);
      return response.data;
    },
    onSuccess: (data) => {
      notifications.success("Usuario creado exitosamente");
      if (onUserCreated) {
        onUserCreated(data);
      } else {
        router.push("/users");
      }
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "No se pudo crear el usuario. Intenta nuevamente.";
      notifications.error(errorMessage);
    },
  });
};
