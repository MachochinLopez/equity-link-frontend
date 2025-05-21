import { SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface StyledSelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
}

export const StyledSelect = forwardRef<HTMLSelectElement, StyledSelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <>
        <label
          htmlFor={props.id}
          className="block text-sm font-bold text-primary"
        >
          {props.label}
        </label>
        <select
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
            "ring-offset-background",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
      </>
    );
  }
);

StyledSelect.displayName = "StyledSelect";
