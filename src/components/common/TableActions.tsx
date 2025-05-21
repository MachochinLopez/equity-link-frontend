"use client";

import Image from "next/image";
import Swal from "sweetalert2";
import { useState } from "react";

interface TableActionsProps<T extends { id: string | number }> {
  item: T;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  editModal?: React.ComponentType<{
    item: T;
    isOpen: boolean;
    onClose: () => void;
  }>;
}

export function TableActions<T extends { id: string | number }>({
  item,
  onEdit,
  onDelete,
  editModal: EditModal,
}: TableActionsProps<T>) {
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

    if (result.isConfirmed && onDelete) {
      onDelete(item);
    }
  };

  return (
    <>
      <div className="flex space-x-2">
        {(onEdit || EditModal) && (
          <button
            onClick={() => {
              if (EditModal) {
                setIsEditModalOpen(true);
              } else if (onEdit) {
                onEdit(item);
              }
            }}
            className="hover:cursor-pointer hover:bg-gray-100 p-2 rounded-md"
          >
            <Image
              src="/assets/images/edit.svg"
              alt="Editar"
              width={20}
              height={20}
            />
          </button>
        )}
        {onDelete && (
          <button
            onClick={handleDelete}
            className="hover:cursor-pointer hover:bg-gray-100 p-2 rounded-md"
          >
            <Image
              src="/assets/images/delete.svg"
              alt="Eliminar"
              width={20}
              height={20}
            />
          </button>
        )}
      </div>

      {EditModal && (
        <EditModal
          item={item}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </>
  );
}
