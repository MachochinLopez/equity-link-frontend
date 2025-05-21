"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api/axios";
import { notifications } from "@/lib/services/notifications";

interface DeleteInvoiceResponse {
  message: string;
}

export function useDeleteInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (invoiceId: string) => {
      const response = await api.delete<DeleteInvoiceResponse>(
        `/invoices/${invoiceId}`
      );
      return response.data;
    },
    onSuccess: (data) => {
      notifications.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "No se pudo eliminar la factura. Intenta nuevamente.";
      notifications.error(errorMessage);
    },
  });
}
