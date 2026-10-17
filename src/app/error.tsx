"use client";

import { useEffect } from "react";

import { t } from "@/shared/i18n";
import { Button } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="py-20 text-center">
      <h1 className="text-page-title font-bold text-text-primary">{t("errors.genericTitle")}</h1>
      <p className="mt-3 text-body text-text-secondary">{t("errors.genericDescription")}</p>
      <Button onClick={reset} className="mt-6 h-11 px-6 font-semibold">
        {t("errors.retry")}
      </Button>
    </Container>
  );
}
