import type { ReactNode } from "react";
import { Container } from "@/shared/ui/Container";

interface GradientHeaderProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export const GradientHeader = ({
  children,
  className = "",
  contentClassName = "",
}: GradientHeaderProps) => (
  <section
    className={`sticky top-0 z-50 box-border overflow-hidden bg-header-gradient ${className}`.trim()}
  >
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute top-[-24px] left-1/2 h-[152px] w-[200px] -translate-x-1/2 rounded-full bg-[#F0B90B] opacity-70 blur-[80px] md:top-[-28px] md:left-auto md:right-[6%] md:translate-x-0 md:opacity-80 lg:right-[10%] xl:right-[12%]" />
    </div>

    <Container
      className={`relative z-10 box-border  ${contentClassName}`.trim()}
    >
      {children}
    </Container>
  </section>
);
