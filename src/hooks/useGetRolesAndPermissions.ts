import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api/axios";
import { Role } from "@/types/role";

interface RolesResponse {
  data: Role[];
  current_page: number;
  current_page_url: string;
  first_page_url: string;
  from: number;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
}

export const useGetRolesAndPermissions = () => {
  return useQuery<RolesResponse>({
    queryKey: ["roles-and-permissions"],
    queryFn: async () => {
      const response = await api.get<RolesResponse>("/roles-and-permissions");
      return response.data;
    },
  });
};
