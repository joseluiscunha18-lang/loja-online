export function ProductCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col" aria-hidden="true">
      <div className="aspect-square w-full rounded-3xl bg-secondary" />
      <div className="flex items-center gap-2 px-1 pt-2.5">
        <div className="min-w-0 flex-1 space-y-2">
          <div className="h-3.5 w-4/5 rounded-full bg-secondary" />
          <div className="h-3.5 w-1/3 rounded-full bg-secondary" />
        </div>
        <div className="size-7 shrink-0 rounded-full bg-secondary" />
      </div>
    </div>
  );
}
