import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api/axios";
import { notifications } from "@/lib/services/notifications";
import { AxiosError } from "axios";

interface UpdatePermissionParams {
  id: number;
  data: {
    name: string;
    description: string;
  };
}

interface UpdatePermissionResponse {
  message: string;
}

export const useUpdatePermission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: UpdatePermissionParams) => {
      const response = await api.put<UpdatePermissionResponse>(
        `/permissions/${id}`,
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
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error.response?.data?.message ||
        "No se pudo actualizar el permiso. Intenta nuevamente.";
      notifications.error(errorMessage);
    },
  });
};
