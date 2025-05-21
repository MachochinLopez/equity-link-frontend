import { useEffect } from "react";
import Image from "next/image";
import { PermissionForm, PermissionFormData } from "./PermissionForm";
import { useUpdatePermission } from "@/hooks/useUpdatePermission";
import { Permission } from "@/types/permission";

interface EditPermissionModalProps {
  item: Permission;
  isOpen: boolean;
  onClose: () => void;
}

export function EditPermissionModal({
  item: permission,
  isOpen,
  onClose,
}: EditPermissionModalProps) {
  const updatePermission = useUpdatePermission();

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

  const initialData: PermissionFormData = {
    name: permission.name,
  };

  const onSubmit = (data: PermissionFormData) => {
    updatePermission.mutate(
      { id: permission.id, data },
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
        <h2 className="text-2xl font-bold mb-6 pr-8">Editar Permiso</h2>
        <PermissionForm
          initialData={initialData}
          onSubmit={onSubmit}
          isSubmitting={updatePermission.isPending}
          submitButtonText="Guardar"
          submitButtonLoadingText="Guardando..."
        />
      </div>
    </div>
  );
}
