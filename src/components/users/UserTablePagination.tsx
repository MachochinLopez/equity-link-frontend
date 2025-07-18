import { TablePagination } from "../common/TablePagination";

interface UserTablePaginationProps {
  currentPage: number;
  from: number;
  to: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPageChange: (page: number) => void;
}

export function UserTablePagination(props: UserTablePaginationProps) {
  return <TablePagination {...props} variant="detailed" />;
}
