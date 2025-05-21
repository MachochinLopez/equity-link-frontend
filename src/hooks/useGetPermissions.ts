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

export function useGetPermissions(page: number = 1, getAll: boolean = false) {
  return useQuery<PermissionsResponse>({
    queryKey: ["permissions", page, getAll],
    queryFn: async () => {
      if (!getAll) {
        const response = await api.get<PermissionsResponse>(
          `/permissions?page=${page}`
        );
        return response.data;
      }

      // Fetch all pages
      let allPermissions: Permission[] = [];
      let currentPage = 1;
      let hasNextPage = true;

      while (hasNextPage) {
        const response = await api.get<PermissionsResponse>(
          `/permissions?page=${currentPage}`
        );
        allPermissions = [...allPermissions, ...response.data.data];
        hasNextPage = !!response.data.next_page_url;
        currentPage++;
      }

      return {
        data: allPermissions,
        current_page: 1,
        from: 1,
        to: allPermissions.length,
        next_page_url: null,
        prev_page_url: null,
      };
    },
  });
}
