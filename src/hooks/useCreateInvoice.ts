import { useState } from "react";
import api from "@/lib/api/axios";
import { notifications } from "@/lib/services/notifications";
import { AxiosError } from "axios";

interface CreateInvoiceResponse {
  message: string;
}

export function useCreateInvoice() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createInvoice = async (file: File) => {
    try {
      setIsLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("xml_file", file);

      const response = await api.post<CreateInvoiceResponse>(
        "/invoices",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      notifications.success(response.data.message);
      return true;
    } catch (err) {
      let errorMessage = "Error al crear la factura";

      if (err instanceof AxiosError && err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      notifications.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createInvoice,
    isLoading,
    error,
  };
}
