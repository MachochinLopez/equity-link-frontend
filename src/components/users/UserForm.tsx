import { useForm } from "react-hook-form";
import { useGetRolesAndPermissions } from "@/hooks/useGetRolesAndPermissions";
import { StyledButton } from "@/components/common/StyledButton";
import { StyledInput } from "@/components/common/StyledInput";
import { StyledSelect } from "@/components/common/StyledSelect";
import { StyledCheckbox } from "@/components/common/StyledCheckbox";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/common/Spinner";

export interface UserFormData {
  name: string;
  email: string;
  role: string;
  extra_permissions: string[];
}

interface UserFormProps {
  initialData?: UserFormData;
  onSubmit: (data: UserFormData) => void;
  isSubmitting: boolean;
  submitButtonText: string;
  submitButtonLoadingText: string;
}

export function UserForm({
  initialData,
  onSubmit,
  isSubmitting,
  submitButtonText,
  submitButtonLoadingText,
}: UserFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>({
    defaultValues: initialData,
  });

  const { data: rolesData, isLoading } = useGetRolesAndPermissions();
  const [selectedRolePermissions, setSelectedRolePermissions] = useState<
    string[]
  >([]);
  const [allPermissions, setAllPermissions] = useState<string[]>([]);

  const selectedRole = watch("role");

  useEffect(() => {
    if (rolesData?.data.length && !initialData?.role) {
      const firstRole = rolesData.data[0].name;
      setValue("role", firstRole);
    }
  }, [rolesData, setValue, initialData]);

  useEffect(() => {
    if (rolesData) {
      const allPerms = new Set<string>();
      rolesData.data.forEach((role) => {
        role.permissions.forEach((perm) => allPerms.add(perm));
      });
      setAllPermissions(Array.from(allPerms));
    }
  }, [rolesData]);

  useEffect(() => {
    if (selectedRole && rolesData) {
      const role = rolesData.data.find((r) => r.name === selectedRole);
      if (role) {
        setSelectedRolePermissions(role.permissions);
        if (initialData?.role !== selectedRole) {
          const currentPermissions = watch("extra_permissions") || [];
          const newExtraPermissions = currentPermissions.filter(
            (perm) => !role.permissions.includes(perm)
          );
          setValue("extra_permissions", newExtraPermissions);
        }
      }
    }
  }, [selectedRole, rolesData, setValue, watch, initialData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-sm">
      <div>
        <StyledInput
          id="name"
          name="name"
          label="Nombre"
          register={register}
          errors={errors}
        />
      </div>

      <div>
        <StyledInput
          type="email"
          id="email"
          name="email"
          label="Email"
          register={register}
          errors={errors}
        />
      </div>

      <div>
        <StyledSelect
          {...register("role", { required: true })}
          label="Rol"
          id="role"
        >
          <option value="">Selecciona un rol</option>
          {rolesData?.data.map((role) => (
            <option key={role.id} value={role.name}>
              {role.name}
            </option>
          ))}
        </StyledSelect>
      </div>

      <div>
        <label className="block text-sm font-bold text-primary mb-4">
          Permisos Adicionales
        </label>
        <div className="grid grid-cols-2 gap-4">
          {allPermissions.map((permission) => (
            <div key={permission} className="flex items-center space-x-2">
              <StyledCheckbox
                id={permission}
                checked={
                  selectedRolePermissions.includes(permission) ||
                  (Boolean(watch("extra_permissions")?.includes(permission)) &&
                    !selectedRolePermissions.includes(permission))
                }
                disabled={selectedRolePermissions.includes(permission)}
                onChange={(e) => {
                  const currentPermissions = watch("extra_permissions") || [];
                  if (e.target.checked) {
                    setValue("extra_permissions", [
                      ...currentPermissions,
                      permission,
                    ]);
                  } else {
                    setValue(
                      "extra_permissions",
                      currentPermissions.filter((p) => p !== permission)
                    );
                  }
                }}
              />
              <label htmlFor={permission} className="text-sm">
                {permission}
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
