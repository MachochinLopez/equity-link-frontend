"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../common/DataTable";
import { TableActions } from "../common/TableActions";
import { Invoice } from "@/types/invoice";
import { useDeleteInvoice } from "@/hooks/useDeleteInvoice";

interface InvoiceTableProps {
  data: Invoice[];
}

export function InvoiceTable({ data }: InvoiceTableProps) {
  const columnHelper = createColumnHelper<Invoice>();
  const deleteInvoice = useDeleteInvoice();

  const handleDelete = (invoice: Invoice) => {
    deleteInvoice.mutate(invoice.uuid);
  };

  const columns = [
    columnHelper.accessor("uuid", {
      header: "UUID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("folio", {
      header: "Folio",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("issuer", {
      header: "Emisor",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("receiver", {
      header: "Receptor",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("currency", {
      header: "Moneda",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("total", {
      header: "Total",
      cell: (info) => {
        const value = parseFloat(info.getValue());
        const currency = info.row.original.currency;
        return new Intl.NumberFormat("es-MX", {
          style: "currency",
          currency: currency,
        }).format(value);
      },
    }),
    columnHelper.accessor("exchange_rate", {
      header: "Tasa de cambio",
      cell: (info) => {
        const value = parseFloat(info.getValue());
        return new Intl.NumberFormat("es-MX", {
          style: "decimal",
          minimumFractionDigits: 4,
          maximumFractionDigits: 4,
        }).format(value);
      },
    }),
    columnHelper.display({
      id: "actions",
      header: "Acciones",
      cell: (info) => (
        <TableActions
          item={{ ...info.row.original, id: info.row.original.uuid }}
          onDelete={(invoice) => handleDelete(invoice)}
        />
      ),
    }),
  ];

  return <DataTable data={data} columns={columns} />;
}
