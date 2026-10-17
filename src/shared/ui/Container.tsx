import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export const Container = ({ children, className = "" }: ContainerProps) => (
  <div
    className={`mx-auto min-w-0 w-full max-w-content px-4 sm:px-6 lg:px-8 ${className}`.trim()}
  >
    {children}
  </div>
);
