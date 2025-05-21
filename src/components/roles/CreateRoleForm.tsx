import { useCreateRole } from "@/hooks/useCreateRole";
import { RoleForm, RoleFormData } from "./RoleForm";
import { useRouter } from "next/navigation";
import { notifications } from "@/lib/services/notifications";

export const CreateRoleForm = () => {
  const router = useRouter();
  const createRole = useCreateRole();

  const onSubmit = (data: RoleFormData) => {
    createRole.mutate(data, {
      onSuccess: () => {
        notifications.success("Rol creado exitosamente");
        router.push("/roles");
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message ||
          "No se pudo crear el rol. Intenta nuevamente.";
        notifications.error(errorMessage);
      },
    });
  };

  return (
    <RoleForm
      onSubmit={onSubmit}
      isSubmitting={createRole.isPending}
      submitButtonText="Crear Rol"
      submitButtonLoadingText="Creando..."
    />
  );
};
