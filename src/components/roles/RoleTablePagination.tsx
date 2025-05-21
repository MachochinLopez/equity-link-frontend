import { TablePagination } from "../common/TablePagination";

interface RoleTablePaginationProps {
  currentPage: number;
  from: number;
  to: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPageChange: (page: number) => void;
}

export function RoleTablePagination(props: RoleTablePaginationProps) {
  return <TablePagination {...props} variant="detailed" />;
}
