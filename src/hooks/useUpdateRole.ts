import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api/axios";
import { notifications } from "@/lib/services/notifications";
import { AxiosError } from "axios";

interface UpdateRoleData {
  name: string;
  permissions: string[];
}

interface UpdateRoleResponse {
  message: string;
}

export function useUpdateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateRoleData }) => {
      const response = await api.put<UpdateRoleResponse>(`/roles/${id}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      notifications.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      queryClient.invalidateQueries({ queryKey: ["roles-and-permissions"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error.response?.data?.message ||
        "No se pudo actualizar el rol. Intenta nuevamente.";
      notifications.error(errorMessage);
    },
  });
}
