import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api/axios";
import { Role } from "@/types/role";

interface GetRoleResponse {
  data: Role;
}

export function useGetRole(roleId: number) {
  return useQuery<Role>({
    queryKey: ["role", roleId],
    queryFn: async () => {
      const response = await api.get<GetRoleResponse>(`/roles/${roleId}`);
      return response.data.data;
    },
    enabled: !!roleId,
  });
}
