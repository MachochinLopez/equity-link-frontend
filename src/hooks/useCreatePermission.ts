import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PermissionFormData } from "@/components/permissions/PermissionForm";
import api from "@/lib/api/axios";

export const useCreatePermission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PermissionFormData) =>
      api.post("/permissions", data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
      queryClient.invalidateQueries({ queryKey: ["roles-and-permissions"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
