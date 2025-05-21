import api from "@/lib/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@/lib/services/notifications";
import { AxiosError } from "axios";

interface DeleteRoleResponse {
  message: string;
}

export function useDeleteRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete<DeleteRoleResponse>(`/roles/${id}`);
      return response.data;
    },
    onSuccess: (data) => {
      notifications.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error.response?.data?.message ||
        "No se pudo eliminar el rol. Intenta nuevamente.";
      notifications.error(errorMessage);
    },
  });
}
