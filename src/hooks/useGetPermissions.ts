import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api/axios";
import { Permission } from "@/types/role";

interface PermissionsResponse {
  data: Permission[];
  current_page: number;
  from: number;
  to: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}

export function useGetPermissions(page: number = 1) {
  return useQuery<PermissionsResponse>({
    queryKey: ["permissions", page],
    queryFn: async () => {
      const response = await api.get<PermissionsResponse>(
        `/permissions?page=${page}`
      );
      return response.data;
    },
  });
}
