import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api/axios";
import { Permission } from "@/types/role";

interface PermissionsResponse {
  data: Permission[];
}

export function useGetPermissions() {
  return useQuery<Permission[]>({
    queryKey: ["permissions"],
    queryFn: async () => {
      const response = await api.get<PermissionsResponse>("/permissions");
      return response.data.data;
    },
  });
}
