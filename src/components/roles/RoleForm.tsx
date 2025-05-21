import { useForm } from "react-hook-form";
import { StyledInput } from "@/components/common/StyledInput";
import { StyledButton } from "@/components/common/StyledButton";
import { StyledCheckbox } from "@/components/common/StyledCheckbox";
import { useGetPermissions } from "@/hooks/useGetPermissions";
import { Spinner } from "@/components/common/Spinner";
import { Permission } from "@/types/role";

export interface RoleFormData {
  name: string;
  permissions: string[];
}

interface RoleFormProps {
  initialData?: RoleFormData;
  onSubmit: (data: RoleFormData) => void;
  isSubmitting: boolean;
  submitButtonText: string;
  submitButtonLoadingText: string;
}

export function RoleForm({
  initialData,
  onSubmit,
  isSubmitting,
  submitButtonText,
  submitButtonLoadingText,
}: RoleFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RoleFormData>({
    defaultValues: initialData,
  });

  const { data: permissionsData, isLoading } = useGetPermissions(1, true);
  const currentPermissions = watch("permissions") || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <StyledInput
          id="name"
          name="name"
          label="Nombre"
          register={register}
          errors={errors}
          validation={{ required: "El nombre es requerido" }}
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-primary mb-4">
          Permisos
        </label>
        <div className="grid grid-cols-2 gap-4">
          {permissionsData?.data.map((permission: Permission) => (
            <div key={permission.id} className="flex items-center space-x-2">
              <StyledCheckbox
                id={permission.name}
                checked={currentPermissions.includes(permission.name)}
                onChange={(e) => {
                  const currentPerms = watch("permissions") || [];
                  if (e.target.checked) {
                    setValue("permissions", [...currentPerms, permission.name]);
                  } else {
                    setValue(
                      "permissions",
                      currentPerms.filter((p) => p !== permission.name)
                    );
                  }
                }}
              />
              <label htmlFor={permission.name} className="text-sm">
                {permission.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <StyledButton
        type="submit"
        disabled={isSubmitting}
        isLoading={isSubmitting}
      >
        {isSubmitting ? submitButtonLoadingText : submitButtonText}
      </StyledButton>
    </form>
  );
}
