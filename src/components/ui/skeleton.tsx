import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-white/30 dark:bg-neutral-800",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
