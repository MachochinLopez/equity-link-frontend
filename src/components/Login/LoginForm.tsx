import { useForm } from "react-hook-form";
import { useLogin } from "@/hooks/useLogin";
import { StyledInput } from "../common/StyledInput";
import { StyledButton } from "../common/StyledButton";

interface LoginFormData {
  email: string;
  password: string;
}

export function LoginForm() {
  const loginMutation = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="self-center w-full space-y-4 max-w-sm"
    >
      <StyledInput
        id="email"
        label="Correo electrónico"
        type="email"
        placeholder="ejemplo@correo.com"
        register={register}
        name="email"
        errors={errors}
        validation={{
          required: "Correo electrónico es requerido",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Correo electrónico inválido",
          },
        }}
      />
      <StyledInput
        id="password"
        label="Contraseña"
        type="password"
        placeholder="********"
        register={register}
        name="password"
        errors={errors}
        validation={{
          required: "Contraseña es requerida",
        }}
      />
      <StyledButton
        type="submit"
        isLoading={loginMutation.isPending}
        className="mt-8"
      >
        {loginMutation.isPending ? "Iniciando sesión..." : "Iniciar sesión"}
      </StyledButton>
    </form>
  );
}
