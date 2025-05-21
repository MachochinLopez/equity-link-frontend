import api from "@/lib/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@/lib/services/notifications";

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
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "No se pudo eliminar el rol. Intenta nuevamente.";
      notifications.error(errorMessage);
    },
  });
}
