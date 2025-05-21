import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api/axios";
import { notifications } from "@/lib/services/notifications";
import { AxiosError } from "axios";

interface DeleteUserResponse {
  message: string;
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: number) => {
      const response = await api.delete<DeleteUserResponse>(`/users/${userId}`);
      return response.data;
    },
    onSuccess: (data) => {
      notifications.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error.response?.data?.message ||
        "No se pudo eliminar el usuario. Intenta nuevamente.";
      notifications.error(errorMessage);
    },
  });
}
