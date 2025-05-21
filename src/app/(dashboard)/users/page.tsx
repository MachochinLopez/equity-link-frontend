"use client";

import { useGetUsers } from "@/hooks/useGetUsers";
import { useState } from "react";
import { Spinner } from "@/components/common/Spinner";
import { UserTable } from "@/components/users/UserTable";
import { UserTablePagination } from "@/components/users/UserTablePagination";
import { useRouter } from "next/navigation";
import { StyledButton } from "@/components/common/StyledButton";

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetUsers(page);
  const router = useRouter();

  const handleCreateUser = () => {
    router.push("/users/create");
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
        <h1 className="text-2xl font-bold">Usuarios</h1>
        <div className="flex justify-end">
          <StyledButton onClick={handleCreateUser} className="w-24">
            Crear Usuario
          </StyledButton>
        </div>
      </div>

      <UserTable data={data?.data || []} />

      <UserTablePagination
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
