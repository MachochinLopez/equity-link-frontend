import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api/axios";

interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  role_names: string[];
  permission_names: string[];
}

interface PaginatedResponse {
  current_page: number;
  current_page_url: string;
  data: User[];
  first_page_url: string;
  from: number;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
}

export const useGetUsers = (page: number = 1) => {
  return useQuery<PaginatedResponse>({
    queryKey: ["users", page],
    queryFn: async () => {
      const { data } = await api.get(`/users?page=${page}`);
      return data;
    },
  });
};
