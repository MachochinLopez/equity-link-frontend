"use client";

import { useGetPermissions } from "@/hooks/useGetPermissions";
import { Spinner } from "@/components/common/Spinner";
import { PermissionTable } from "@/components/permissions/PermissionTable";
import { PermissionTablePagination } from "@/components/permissions/PermissionTablePagination";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { StyledButton } from "@/components/common/StyledButton";

export default function PermissionsPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetPermissions(page);
  const router = useRouter();

  const handleCreatePermission = () => {
    router.push("/permissions/create");
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
        <h1 className="text-2xl font-bold">Permissions</h1>
        <div className="flex justify-end">
          <StyledButton onClick={handleCreatePermission} className="w-24">
            Crear Permiso
          </StyledButton>
        </div>
      </div>

      <PermissionTable data={data?.data || []} />

      <PermissionTablePagination
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
