import { useEffect } from "react";
import Image from "next/image";
import { RoleForm, RoleFormData } from "./RoleForm";
import { useUpdateRole } from "@/hooks/useUpdateRole";
import { Role } from "@/types/role";

interface EditRoleModalProps {
  item: Role;
  isOpen: boolean;
  onClose: () => void;
}

export function EditRoleModal({
  item: role,
  isOpen,
  onClose,
}: EditRoleModalProps) {
  const updateRole = useUpdateRole();

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const initialData: RoleFormData = {
    name: role.name,
    permissions: role.permissions,
  };

  const onSubmit = (data: RoleFormData) => {
    updateRole.mutate(
      { id: role.id, data },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-[1000]"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg w-full max-w-md max-h-[70vh] overflow-y-auto relative z-[1010]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 hover:bg-gray-100 hover:cursor-pointer p-2 rounded-full"
        >
          <Image
            src="/assets/images/close.svg"
            alt="Cerrar"
            width={20}
            height={20}
          />
        </button>
        <h2 className="text-2xl font-bold mb-6 pr-8">Editar Rol</h2>
        <RoleForm
          initialData={initialData}
          onSubmit={onSubmit}
          isSubmitting={updateRole.isPending}
          submitButtonText="Guardar"
          submitButtonLoadingText="Guardando..."
        />
      </div>
    </div>
  );
}
