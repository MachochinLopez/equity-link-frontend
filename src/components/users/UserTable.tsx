import { createColumnHelper } from "@tanstack/react-table";
import { User } from "@/types/user";
import { DataTable } from "../common/DataTable";
import { TableActions } from "../common/TableActions";
import { useDeleteUser } from "@/hooks/useDeleteUser";
import { EditUserModal } from "./EditUserModal";

interface UserTableProps {
  data: User[];
}

export function UserTable({ data }: UserTableProps) {
  const columnHelper = createColumnHelper<User>();
  const deleteUser = useDeleteUser();

  const columns = [
    columnHelper.accessor("name", {
      header: "Nombre",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("email", {
      header: "Correo electrónico",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("role_names", {
      header: "Roles",
      cell: (info) => info.getValue().join(", "),
    }),
    columnHelper.accessor("created_at", {
      header: "Fecha de creación",
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.display({
      id: "actions",
      header: "Acciones",
      cell: (info) => (
        <TableActions
          item={info.row.original}
          onDelete={(user) => deleteUser.mutate(user.id)}
          editModal={EditUserModal}
        />
      ),
    }),
  ];

  return <DataTable data={data} columns={columns} />;
}
