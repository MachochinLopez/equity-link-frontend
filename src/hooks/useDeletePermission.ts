import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api/axios";
import { notifications } from "@/lib/services/notifications";

interface DeletePermissionResponse {
  message: string;
}

export function useDeletePermission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (permissionId: number) => {
      const response = await api.delete<DeletePermissionResponse>(
        `/permissions/${permissionId}`
      );
      return response.data;
    },
    onSuccess: () => {
      notifications.success("Permiso eliminado exitosamente");
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
      queryClient.invalidateQueries({ queryKey: ["roles-and-permissions"] });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "No se pudo eliminar el permiso. Intenta nuevamente.";
      notifications.error(errorMessage);
    },
  });
}
