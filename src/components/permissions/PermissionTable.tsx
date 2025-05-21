import { Permission } from "@/types/permission";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../common/DataTable";
import { TableActions } from "../common/TableActions";
import { useDeletePermission } from "@/hooks/useDeletePermission";
import { EditPermissionModal } from "./EditPermissionModal";

interface PermissionTableProps {
  data: Permission[];
}

export function PermissionTable({ data }: PermissionTableProps) {
  const columnHelper = createColumnHelper<Permission>();
  const deletePermission = useDeletePermission();

  const columns = [
    columnHelper.accessor("name", {
      header: "Nombre",
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: "actions",
      header: "Acciones",
      cell: (info) => (
        <TableActions
          item={info.row.original}
          onDelete={(permission) =>
            deletePermission.mutate(Number(permission.id))
          }
          editModal={EditPermissionModal}
        />
      ),
    }),
  ];

  return <DataTable data={data} columns={columns} />;
}
