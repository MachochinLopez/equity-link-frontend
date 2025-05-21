import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PermissionFormData } from "@/components/permissions/PermissionForm";
import api from "@/lib/api/axios";
import { notifications } from "@/lib/services/notifications";

interface CreatePermissionResponse {
  message: string;
}

export const useCreatePermission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: PermissionFormData) => {
      const response = await api.post<CreatePermissionResponse>(
        "/permissions",
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      notifications.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
      queryClient.invalidateQueries({ queryKey: ["roles-and-permissions"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "No se pudo crear el permiso. Intenta nuevamente.";
      notifications.error(errorMessage);
    },
  });
};
