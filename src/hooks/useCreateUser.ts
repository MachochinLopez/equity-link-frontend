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

export const useCreateUser = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: CreateUserData) => {
      const response = await api.post("/users", data);
      return response.data;
    },
    onSuccess: () => {
      notifications.success("Usuario creado exitosamente");
      router.push("/users");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "No se pudo crear el usuario. Intenta nuevamente.";
      notifications.error(errorMessage);
    },
  });
};
