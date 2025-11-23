import { Token } from "@/types/token";
import { PriceCell, ChangePercent } from "./PriceCell";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info, MoreVertical, TrendingUp, Users, Droplets } from "lucide-react";
import { cn } from "@/lib/utils";

interface TokenRowProps {
  token: Token;
  currentPrice?: number;
  priceChange?: "up" | "down" | null;
  onViewDetails: () => void;
}

export function TokenRow({
  token,
  currentPrice,
  priceChange,
  onViewDetails,
}: TokenRowProps) {
  const displayPrice = currentPrice ?? token.price;

  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 md:gap-4 p-3 md:p-4 border-b border-border hover:bg-secondary/30 transition-colors group cursor-pointer",
        "text-sm md:text-base"
      )}
      onClick={onViewDetails}
    >
      {/* Token Name */}
      <div className="flex items-center gap-2 min-w-0">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold text-primary">
            {token.symbol.charAt(0)}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-semibold truncate">{token.symbol}</div>
          <div className="text-xs text-muted-foreground truncate hidden sm:block">
            {token.name}
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="flex flex-col justify-center">
        <PriceCell
          price={displayPrice}
          priceChange={priceChange}
          className="text-sm md:text-base"
        />
      </div>

      {/* 24h Change */}
      <div className="hidden md:flex flex-col justify-center">
        <ChangePercent change={token.priceChange24h} />
      </div>

      {/* Volume */}
      <div className="hidden md:flex flex-col justify-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="font-mono text-sm cursor-help">
                ${formatNumber(token.volume24h)}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-mono">${token.volume24h.toFixed(2)}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Market Cap */}
      <div className="hidden lg:flex flex-col justify-center">
        <div className="font-mono text-sm">${formatNumber(token.marketCap)}</div>
      </div>

      {/* Liquidity */}
      <div className="hidden lg:flex flex-col justify-center">
        <div className="font-mono text-sm">${formatNumber(token.liquidity)}</div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-1 md:gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <Users className="h-3 w-3" />
                  <span>{formatNumber(token.holders)} holders</span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="h-3 w-3" />
                  <span>${formatNumber(token.liquidity)} liquidity</span>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2 bg-popover border-border" align="end">
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails();
                }}
              >
                View Details
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                Add to Watchlist
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                Share
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

function formatNumber(num: number): string {
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
  return num.toFixed(0);
}
