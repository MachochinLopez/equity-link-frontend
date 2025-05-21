import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api/axios";

interface CreateRoleData {
  name: string;
  description: string;
}

export function useCreateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateRoleData) => {
      const response = await api.post("/roles", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
}
