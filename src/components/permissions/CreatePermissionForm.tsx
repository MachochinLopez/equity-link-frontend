import { useCreatePermission } from "@/hooks/useCreatePermission";
import { PermissionForm, PermissionFormData } from "./PermissionForm";
import { useRouter } from "next/navigation";
import { notifications } from "@/lib/services/notifications";
import { AxiosError } from "axios";

export const CreatePermissionForm = () => {
  const router = useRouter();
  const createPermission = useCreatePermission();

  const onSubmit = (data: PermissionFormData) => {
    createPermission.mutate(data, {
      onSuccess: () => {
        notifications.success("Permiso creado exitosamente");
        router.push("/permissions");
      },
      onError: (error: AxiosError<{ message: string }>) => {
        const errorMessage =
          error.response?.data?.message ||
          "No se pudo crear el permiso. Intenta nuevamente.";
        notifications.error(errorMessage);
      },
    });
  };

  return (
    <PermissionForm
      onSubmit={onSubmit}
      isSubmitting={createPermission.isPending}
      submitButtonText="Crear Permiso"
      submitButtonLoadingText="Creando..."
    />
  );
};
