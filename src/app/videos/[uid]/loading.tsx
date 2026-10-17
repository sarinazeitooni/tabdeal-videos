import { Container } from "@/shared/ui/Container";

export default function VideoLoading() {
  return (
    <div className="pb-12 pt-8">
      <Container>
        <div className="mb-4 h-4 w-40 animate-pulse rounded bg-surface-elevated" />
        <div className="aspect-video w-full animate-pulse rounded-2xl bg-surface-elevated" />
        <div className="mt-6 h-8 w-3/4 animate-pulse rounded bg-surface-elevated" />
        <div className="mt-4 flex items-center gap-3">
          <div className="h-12 w-12 animate-pulse rounded-full bg-surface-elevated" />
          <div className="h-4 w-40 animate-pulse rounded bg-surface-elevated" />
        </div>
        <div className="mt-6 h-28 animate-pulse rounded-2xl bg-surface-elevated" />
      </Container>
    </div>
  );
}
