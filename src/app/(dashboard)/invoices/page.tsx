"use client";

import { InvoiceTablePagination } from "@/components/invoices/InvoiceForm";
import { InvoiceTable } from "@/components/invoices/InvoiceTable";
import { useGetInvoices } from "@/hooks/useGetInvoices";
import { useState } from "react";
import { StyledButton } from "@/components/common/StyledButton";
import { Spinner } from "@/components/common/Spinner";
import { UploadInvoiceModal } from "@/components/invoices/UploadInvoiceModal";
import { useCreateInvoice } from "@/hooks/useCreateInvoice";

export default function InvoicesPage() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, refetch } = useGetInvoices(page);
  const { createInvoice, isLoading: isCreating } = useCreateInvoice();

  const handleUploadInvoice = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async (file: File) => {
    const success = await createInvoice(file);
    if (success) {
      setIsModalOpen(false);
      refetch();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Facturas</h1>
        <div className="flex justify-end">
          <StyledButton onClick={handleUploadInvoice} className="w-32">
            Subir factura
          </StyledButton>
        </div>
      </div>
      <InvoiceTable data={data?.data || []} />

      <InvoiceTablePagination
        currentPage={data?.current_page || 1}
        from={data?.from || 0}
        to={data?.to || 0}
        totalItems={data?.data?.length || 0}
        hasNextPage={!!data?.next_page_url}
        hasPrevPage={!!data?.prev_page_url}
        onPageChange={setPage}
      />

      <UploadInvoiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        isLoading={isCreating}
      />
    </div>
  );
}
