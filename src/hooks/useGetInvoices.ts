import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api/axios";
import { Invoice } from "@/types/invoice";

interface GetInvoicesResponse {
  data: Invoice[];
  current_page: number;
  from: number;
  to: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}

export function useGetInvoices(page: number = 1) {
  return useQuery<GetInvoicesResponse>({
    queryKey: ["invoices", page],
    queryFn: async () => {
      const response = await api.get<GetInvoicesResponse>(
        `/invoices?page=${page}`
      );
      return response.data;
    },
  });
}
