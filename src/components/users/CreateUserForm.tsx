import { useCreateUser } from "@/hooks/useCreateUser";
import { UserForm, UserFormData } from "./UserForm";
import { useState } from "react";
import { TemporaryPasswordModal } from "./TemporaryPasswordModal";
import { useRouter } from "next/navigation";

export const CreateUserForm = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [temporaryPassword, setTemporaryPassword] = useState("");
  const router = useRouter();

  const { mutate, isPending } = useCreateUser((data) => {
    setTemporaryPassword(data.temporary_password);
    setShowPasswordModal(true);
  });

  const onSubmit = (data: UserFormData) => {
    mutate(data);
  };

  const handleCloseModal = () => {
    setShowPasswordModal(false);
    router.push("/users");
  };

  return (
    <>
      <UserForm
        onSubmit={onSubmit}
        isSubmitting={isPending}
        submitButtonText="Crear Usuario"
        submitButtonLoadingText="Creando..."
      />
      <TemporaryPasswordModal
        isOpen={showPasswordModal}
        onClose={handleCloseModal}
        temporaryPassword={temporaryPassword}
      />
    </>
  );
};
