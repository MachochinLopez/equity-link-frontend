import {
  UseFormRegister,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";

interface StyledInputProps<T extends FieldValues> {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  errors: FieldErrors<T>;
  validation?: {
    required?: string | boolean;
    pattern?: {
      value: RegExp;
      message: string;
    };
    minLength?: {
      value: number;
      message: string;
    };
  };
  className?: string;
}

export function StyledInput<T extends FieldValues>({
  id,
  label,
  type = "text",
  placeholder,
  register,
  name,
  errors,
  validation,
  className = "",
}: StyledInputProps<T>) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-bold text-primary">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`mt-1 block w-full rounded-md border border-primary px-3 py-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
        {...register(name, validation)}
      />
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
