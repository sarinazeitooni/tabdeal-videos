import { Container } from "@/shared/ui/Container";

export default function VideosLoading() {
  return (
    <div className="pb-10 pt-8">
      <Container>
        <div className="mb-8 h-12 animate-pulse rounded-lg bg-surface-elevated" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="aspect-video rounded-xl bg-surface-elevated" />
              <div className="mt-3 h-4 w-4/5 rounded bg-surface-elevated" />
              <div className="mt-2 h-3 w-2/5 rounded bg-surface-muted" />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
