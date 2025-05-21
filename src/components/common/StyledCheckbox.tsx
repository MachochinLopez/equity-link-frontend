import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export type StyledCheckboxProps = InputHTMLAttributes<HTMLInputElement>;

export const StyledCheckbox = forwardRef<HTMLInputElement, StyledCheckboxProps>(
  ({ className, type = "checkbox", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "h-4 w-4 rounded border border-input",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

StyledCheckbox.displayName = "StyledCheckbox";
