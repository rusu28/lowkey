import { cn } from "./utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        'animate-[shimmer_2s_linear_infinite] rounded-md bg-gradient-to-r from-muted via-muted-foreground/20 to-muted bg-[length:200%_100%]',
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
