import api from "@/lib/api/axios";
import { useQuery } from "@tanstack/react-query";
import { Role } from "@/types/role";

interface GetRolesResponse {
  data: Role[];
  current_page: number;
  from: number;
  to: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}

export function useGetRoles(page: number) {
  return useQuery<GetRolesResponse>({
    queryKey: ["roles", page],
    queryFn: async () => {
      const response = await api.get(`/roles?page=${page}`);
      return response.data;
    },
  });
}
