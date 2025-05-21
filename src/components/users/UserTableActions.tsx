import { User } from "@/types/user";
import Image from "next/image";
import { useDeleteUser } from "@/hooks/useDeleteUser";
import Swal from "sweetalert2";
import { useState } from "react";
import { EditUserModal } from "./EditUserModal";

interface UserTableActionsProps {
  user: User;
}

export function UserTableActions({ user }: UserTableActionsProps) {
  const deleteUser = useDeleteUser();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      deleteUser.mutate(user.id);
    }
  };

  return (
    <>
      <div className="flex space-x-2">
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="hover:cursor-pointer hover:bg-gray-100 p-2 rounded-md"
        >
          <Image
            src="/assets/images/edit.svg"
            alt="Editar"
            width={20}
            height={20}
          />
        </button>
        <button
          onClick={handleDelete}
          disabled={deleteUser.isPending}
          className="hover:cursor-pointer hover:bg-gray-100 p-2 rounded-md"
        >
          <Image
            src="/assets/images/delete.svg"
            alt="Eliminar"
            width={20}
            height={20}
          />
        </button>
      </div>

      <EditUserModal
        user={user}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  );
}
