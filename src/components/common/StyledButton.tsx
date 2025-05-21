import { Spinner } from "./Spinner";

interface StyledButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export function StyledButton({
  children,
  isLoading,
  className = "",
  disabled,
  ...props
}: StyledButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`bg-primary hover:bg-primary/80 hover:cursor-pointer flex justify-center py-3 px-4 rounded-md text-sm font-medium text-white w-full ${className}`}
      {...props}
    >
      {isLoading ? <Spinner size="sm" /> : children}
    </button>
  );
}
