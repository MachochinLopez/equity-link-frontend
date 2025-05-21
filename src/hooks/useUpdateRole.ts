import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Role } from "@/types/role";
import api from "@/lib/api/axios";
import { notifications } from "@/lib/services/notifications";

interface UpdateRoleData {
  name: string;
  permissions: string[];
}

export function useUpdateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateRoleData }) => {
      const response = await api.put<Role>(`/roles/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      notifications.success("Rol actualizado exitosamente");
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      queryClient.invalidateQueries({ queryKey: ["roles-and-permissions"] });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "No se pudo actualizar el rol. Intenta nuevamente.";
      notifications.error(errorMessage);
    },
  });
}
