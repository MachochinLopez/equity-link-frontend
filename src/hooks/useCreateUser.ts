import api from "@/lib/api/axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { notifications } from "@/lib/services/notifications";
import { AxiosError } from "axios";

interface CreateUserData {
  name: string;
  email: string;
  role: string;
  extra_permissions: string[];
}

interface CreateUserResponse {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
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
      notifications.success(data.message);
      if (onUserCreated) {
        onUserCreated(data);
      } else {
        router.push("/users");
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error.response?.data?.message ||
        "No se pudo crear el usuario. Intenta nuevamente.";
      notifications.error(errorMessage);
    },
  });
};
