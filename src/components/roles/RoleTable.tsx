import { useDeleteRole } from "@/hooks/useDeleteRole";
import { notifications } from "@/lib/services/notifications";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../common/DataTable";
import { TableActions } from "../common/TableActions";
import { Role } from "@/types/role";
import { EditRoleModal } from "./EditRoleModal";
import { useGetRolesAndPermissions } from "@/hooks/useGetRolesAndPermissions";
import { Spinner } from "@/components/common/Spinner";

interface RoleTableProps {
  data: Role[];
}

export function RoleTable({ data }: RoleTableProps) {
  const deleteRole = useDeleteRole();
  const { data: rolesAndPermissions, isLoading } = useGetRolesAndPermissions();
  const columnHelper = createColumnHelper<Role>();

  const handleDelete = async (role: Role) => {
    try {
      const response = await deleteRole.mutateAsync(role.id);
      notifications.success(response.message);
    } catch {
      notifications.error("Error al eliminar el rol");
    }
  };

  const columns = [
    columnHelper.accessor((row) => row.name, {
      id: "name",
      header: "Nombre",
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: "actions",
      header: "Acciones",
      cell: (info) => {
        if (isLoading) {
          return (
            <div className="flex justify-center">
              <Spinner size="sm" color="primary" />
            </div>
          );
        }

        const roleWithPermissions = rolesAndPermissions?.data.find(
          (r) => r.id === info.row.original.id
        );

        if (!roleWithPermissions) {
          return null;
        }

        return (
          <TableActions
            item={roleWithPermissions}
            onDelete={handleDelete}
            editModal={EditRoleModal}
          />
        );
      },
    }),
  ];

  return <DataTable data={data} columns={columns} />;
}
