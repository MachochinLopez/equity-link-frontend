import { User } from "@/types/user";
import { useEditUser } from "@/hooks/useEditUser";
import { UserForm, UserFormData } from "./UserForm";
import { useEffect } from "react";
import Image from "next/image";

interface EditUserModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

export function EditUserModal({ user, isOpen, onClose }: EditUserModalProps) {
  const editUser = useEditUser(user.id);

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

  const initialData: UserFormData = {
    name: user.name,
    email: user.email,
    role: user.role_names[0],
    extra_permissions: user.permission_names,
  };

  const onSubmit = (data: UserFormData) => {
    editUser.mutate(data, {
      onSuccess: () => {
        onClose();
      },
    });
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
        <h2 className="text-2xl font-bold mb-6 pr-8">Editar Usuario</h2>
        <UserForm
          initialData={initialData}
          onSubmit={onSubmit}
          isSubmitting={editUser.isPending}
          submitButtonText="Guardar"
          submitButtonLoadingText="Guardando..."
        />
      </div>
    </div>
  );
}
