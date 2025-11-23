import { Skeleton } from "@/components/ui/skeleton";

export function TokenSkeleton() {
  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 p-4 border-b border-border">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full hidden md:block" />
        <Skeleton className="h-6 w-full hidden md:block" />
        <Skeleton className="h-6 w-full hidden lg:block" />
        <Skeleton className="h-6 w-full hidden lg:block" />
        <Skeleton className="h-6 w-full hidden lg:block" />
      </div>
    </div>
  );
}

export function TokenTableSkeleton() {
  return (
    <div className="space-y-0">
      {Array.from({ length: 10 }).map((_, i) => (
        <TokenSkeleton key={i} />
      ))}
    </div>
  );
}

export function ShimmerSkeleton() {
  return (
    <div className="relative overflow-hidden bg-muted rounded h-6 w-full">
      <div
        className="absolute inset-0 animate-shimmer"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.1), transparent)",
          backgroundSize: "1000px 100%",
        }}
      />
    </div>
  );
}
