import { Container } from "@/shared/ui/Container";

export default function Loading() {
  return (
    <Container className="flex flex-1 flex-col items-center justify-center py-24">
      <div className="h-8 w-48 animate-pulse rounded bg-surface-elevated" />
      <div className="mt-4 h-4 w-72 animate-pulse rounded bg-surface-muted" />
      <div className="mt-8 h-12 w-40 animate-pulse rounded-lg bg-surface-elevated" />
    </Container>
  );
}
