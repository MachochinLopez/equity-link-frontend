import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api/axios";
import { notifications } from "@/lib/services/notifications";
import { AxiosError } from "axios";

interface CreateRoleData {
  name: string;
  permissions: string[];
}

interface CreateRoleResponse {
  message: string;
}

export function useCreateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateRoleData) => {
      const response = await api.post<CreateRoleResponse>("/roles", data);
      return response.data;
    },
    onSuccess: (data) => {
      notifications.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error.response?.data?.message ||
        "No se pudo crear el rol. Intenta nuevamente.";
      notifications.error(errorMessage);
    },
  });
}
