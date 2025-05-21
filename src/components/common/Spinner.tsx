interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  color?: string;
}

export function Spinner({
  size = "md",
  className = "",
  color = "white",
}: SpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div
      className={`${sizeClasses[size]} border-2 border-white/30 border-t-${color} rounded-full animate-spin ${className}`}
    />
  );
}
