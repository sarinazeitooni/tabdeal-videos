import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = ({ label, id, className = "", ...props }: InputProps) => (
  <div className="w-full">
    {label ? (
      <label htmlFor={id} className="mb-2 block text-body-tight font-normal text-text-secondary">
        {label}
      </label>
    ) : null}
    <input
      id={id}
      className={`h-12 w-full rounded-md border border-border bg-surface-elevated px-4 text-body-tight font-normal text-text-primary placeholder:text-text-muted transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 ${className}`.trim()}
      {...props}
    />
  </div>
);
