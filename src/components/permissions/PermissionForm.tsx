import { useForm } from "react-hook-form";
import { StyledInput } from "@/components/common/StyledInput";
import { StyledButton } from "@/components/common/StyledButton";

export interface PermissionFormData {
  name: string;
}

interface PermissionFormProps {
  initialData?: PermissionFormData;
  onSubmit: (data: PermissionFormData) => void;
  isSubmitting: boolean;
  submitButtonText: string;
  submitButtonLoadingText: string;
}

export function PermissionForm({
  initialData,
  onSubmit,
  isSubmitting,
  submitButtonText,
  submitButtonLoadingText,
}: PermissionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PermissionFormData>({
    defaultValues: initialData,
  });

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
