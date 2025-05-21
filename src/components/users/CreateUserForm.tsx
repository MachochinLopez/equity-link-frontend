import { useCreateUser } from "@/hooks/useCreateUser";
import { UserForm, UserFormData } from "./UserForm";

export const CreateUserForm = () => {
  const { mutate, isPending } = useCreateUser();

  const onSubmit = (data: UserFormData) => {
    mutate(data);
  };

  return (
    <UserForm
      onSubmit={onSubmit}
      isSubmitting={isPending}
      submitButtonText="Crear Usuario"
      submitButtonLoadingText="Creando..."
    />
  );
};
