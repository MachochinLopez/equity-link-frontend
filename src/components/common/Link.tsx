interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "secondary";
}

export function StyledLink({
  children,
  variant = "primary",
  className = "",
  ...props
}: LinkProps) {
  const variantStyles = {
    primary: "text-blue-600 hover:underline",
    secondary: "text-gray-600 hover:underline",
  };

  return (
    <a className={`text-sm ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </a>
  );
}
