import { Spinner } from "./Spinner";

interface StyledButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "secondary";
}

export function StyledButton({
  children,
  isLoading,
  className = "",
  variant = "primary",
  disabled,
  ...props
}: StyledButtonProps) {
  const buttonClass =
    variant === "primary"
      ? "bg-primary hover:bg-primary/80 hover:cursor-pointer flex justify-center py-3 px-4 rounded-md text-sm font-medium text-white w-full"
      : "bg-white hover:bg-primary/10 hover:cursor-pointer flex justify-center py-3 px-4 rounded-md text-sm font-bold text-black w-full";
  return (
    <button
      disabled={disabled || isLoading}
      className={`${buttonClass} ${className}`}
      {...props}
    >
      {isLoading ? <Spinner size="sm" /> : children}
    </button>
  );
}
