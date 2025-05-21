import { useForm } from "react-hook-form";
import { useCreateUser } from "@/hooks/useCreateUser";
import { useGetRolesAndPermissions } from "@/hooks/useGetRolesAndPermissions";
import { StyledButton } from "@/components/common/StyledButton";
import { StyledInput } from "@/components/common/StyledInput";
import { StyledSelect } from "@/components/common/StyledSelect";
import { StyledCheckbox } from "@/components/common/StyledCheckbox";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/common/Spinner";

interface CreateUserFormData {
  name: string;
  email: string;
  role: string;
  extra_permissions: string[];
}

export const CreateUserForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateUserFormData>();
  const { mutate, isPending } = useCreateUser();
  const { data: rolesData, isLoading } = useGetRolesAndPermissions();
  const [selectedRolePermissions, setSelectedRolePermissions] = useState<
    string[]
  >([]);
  const [allPermissions, setAllPermissions] = useState<string[]>([]);

  const selectedRole = watch("role");

  useEffect(() => {
    if (rolesData?.data.length) {
      const firstRole = rolesData.data[0].name;
      setValue("role", firstRole);
    }
  }, [rolesData, setValue]);

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
        setValue("extra_permissions", role.permissions);
      }
    }
  }, [selectedRole, rolesData, setValue]);

  const onSubmit = (data: CreateUserFormData) => {
    mutate(data);
  };

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
                checked={Boolean(
                  watch("extra_permissions")?.includes(permission)
                )}
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

      <StyledButton type="submit" disabled={isPending} isLoading={isPending}>
        {isPending ? "Creando..." : "Crear Usuario"}
      </StyledButton>
    </form>
  );
};
