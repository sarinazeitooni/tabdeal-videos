"use client";

import { t } from "@/shared/i18n";
import { Button } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ reset }: ErrorProps) => (
  <Container className="py-20 text-center">
    <h1 className="text-heading-lg font-bold text-text-primary md:text-display">
      {t("errors.genericTitle")}
    </h1>
    <p className="mt-3 text-body font-normal text-text-secondary">
      {t("errors.genericDescription")}
    </p>
    <Button onClick={reset} className="mt-6 px-6 py-2.5 text-body-tight font-medium">
      {t("errors.retry")}
    </Button>
  </Container>
);

export default Error;
