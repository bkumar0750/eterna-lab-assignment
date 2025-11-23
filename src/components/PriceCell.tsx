import { cn } from "@/lib/utils";

interface PriceCellProps {
  price: number;
  priceChange?: "up" | "down" | null;
  className?: string;
}

export function PriceCell({ price, priceChange, className }: PriceCellProps) {
  return (
    <div
      className={cn(
        "font-mono transition-colors duration-300",
        priceChange === "up" && "animate-price-up text-success",
        priceChange === "down" && "animate-price-down text-destructive",
        !priceChange && "text-foreground",
        className
      )}
    >
      ${price.toFixed(6)}
    </div>
  );
}

interface ChangePercentProps {
  change: number;
  className?: string;
}

export function ChangePercent({ change, className }: ChangePercentProps) {
  const isPositive = change >= 0;
  
  return (
    <div
      className={cn(
        "font-semibold",
        isPositive ? "text-success" : "text-destructive",
        className
      )}
    >
      {isPositive ? "+" : ""}
      {change.toFixed(2)}%
    </div>
  );
}
