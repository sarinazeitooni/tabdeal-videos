import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "ghost" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-ink hover:bg-accent-hover focus-visible:ring-accent disabled:bg-accent/40",
  ghost:
    "bg-transparent text-text-secondary hover:bg-surface-elevated hover:text-text-primary focus-visible:ring-accent",
  icon: "bg-transparent text-text-secondary hover:text-text-primary focus-visible:ring-accent",
};

export const Button = ({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={`inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${className}`.trim()}
    {...props}
  >
    {children}
  </button>
);
