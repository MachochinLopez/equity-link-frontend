"use client";

import { useGetRoles } from "@/hooks/useGetRoles";
import { useState } from "react";
import { Spinner } from "@/components/common/Spinner";
import { RoleTable } from "@/components/roles/RoleTable";
import { useRouter } from "next/navigation";
import { StyledButton } from "@/components/common/StyledButton";
import { RoleTablePagination } from "@/components/roles/RoleTablePagination";

export default function RolesPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetRoles(page);
  const router = useRouter();

  const handleCreateRole = () => {
    router.push("/roles/create");
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
        <h1 className="text-2xl font-bold">Roles</h1>
        <div className="flex justify-end">
          <StyledButton onClick={handleCreateRole} className="w-24">
            Crear Rol
          </StyledButton>
        </div>
      </div>

      <RoleTable data={data?.data || []} />

      <RoleTablePagination
        currentPage={data?.current_page || 1}
        from={data?.from || 0}
        to={data?.to || 0}
        totalItems={data?.data?.length || 0}
        hasNextPage={!!data?.next_page_url}
        hasPrevPage={!!data?.prev_page_url}
        onPageChange={setPage}
      />
    </div>
  );
}
