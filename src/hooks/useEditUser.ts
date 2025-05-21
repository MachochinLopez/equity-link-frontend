import api from "@/lib/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@/lib/services/notifications";

interface EditUserData {
  name: string;
  email: string;
  role: string;
  extra_permissions: string[];
}

export const useEditUser = (userId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EditUserData) => {
      const response = await api.put(`/users/${userId}`, data);
      return response.data;
    },
    onSuccess: () => {
      notifications.success("Usuario actualizado exitosamente");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "No se pudo actualizar el usuario. Intenta nuevamente.";
      notifications.error(errorMessage);
    },
  });
};
