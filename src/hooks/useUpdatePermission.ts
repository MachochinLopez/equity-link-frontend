import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PermissionFormData } from "@/components/permissions/PermissionForm";
import api from "@/lib/api/axios";

interface UpdatePermissionParams {
  id: string;
  data: PermissionFormData;
}

export const useUpdatePermission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdatePermissionParams) =>
      api.put(`/permissions/${id}`, data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
      queryClient.invalidateQueries({ queryKey: ["roles-and-permissions"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
