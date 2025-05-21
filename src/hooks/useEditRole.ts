import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface EditRoleData {
  name: string;
  description: string;
}

export function useEditRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: EditRoleData }) => {
      const response = await api.put(`/roles/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
}
