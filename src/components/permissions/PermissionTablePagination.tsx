import { TablePagination } from "../common/TablePagination";

interface PermissionTablePaginationProps {
  currentPage: number;
  from: number;
  to: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPageChange: (page: number) => void;
}

export function PermissionTablePagination(
  props: PermissionTablePaginationProps
) {
  return <TablePagination {...props} variant="detailed" />;
}
