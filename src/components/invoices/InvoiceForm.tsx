import { TablePagination } from "../common/TablePagination";

interface InvoiceTablePaginationProps {
  currentPage: number;
  from: number;
  to: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPageChange: (page: number) => void;
}

export function InvoiceTablePagination(props: InvoiceTablePaginationProps) {
  return <TablePagination {...props} variant="detailed" />;
}
