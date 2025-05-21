import api from "@/lib/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@/lib/services/notifications";
import { AxiosError } from "axios";

interface EditUserData {
  name: string;
  email: string;
  role: string;
  extra_permissions: string[];
}

interface EditUserResponse {
  message: string;
}

export const useEditUser = (userId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EditUserData) => {
      const response = await api.put<EditUserResponse>(
        `/users/${userId}`,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      notifications.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error.response?.data?.message ||
        "No se pudo actualizar el usuario. Intenta nuevamente.";
      notifications.error(errorMessage);
    },
  });
};
