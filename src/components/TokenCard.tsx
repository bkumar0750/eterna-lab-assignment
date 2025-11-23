import { Token } from "@/types/token";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Users, Droplet, ArrowUpRight, Globe, LineChart, Activity, Zap, BarChart3, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface TokenCardProps {
  token: Token;
  currentPrice?: number;
  priceChange?: "up" | "down" | null;
  onViewDetails: () => void;
}

export function TokenCard({ token, currentPrice, priceChange, onViewDetails }: TokenCardProps) {
  const { toast } = useToast();
  const displayPrice = currentPrice ?? token.price;
  const change24h = token.priceChange24h;
  const isPositive = change24h >= 0;

  const handleCopyAddress = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(token.id);
      toast({
        title: "Copied!",
        description: "Token address copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy address",
        variant: "destructive",
      });
    }
  };

  return (
    <Card 
      className="group relative p-2 sm:p-3 hover:border-primary/50 transition-all cursor-pointer bg-card/80 backdrop-blur-sm border-border/40"
      onClick={onViewDetails}
    >
      <div className="flex items-start gap-2 sm:gap-3">
        {/* Token Avatar */}
        <div className="relative flex-shrink-0">
          <Avatar className="h-12 w-12 sm:h-16 sm:w-16 border-2 border-border/40">
            <AvatarImage src={token.logo} alt={token.symbol} />
            <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs sm:text-sm">
              {token.symbol.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-success border-2 border-card flex items-center justify-center">
            <Zap className="w-2 h-2 sm:w-3 sm:h-3 text-card" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 space-y-1 sm:space-y-2">
          {/* Header Row */}
          <div className="flex items-start justify-between gap-1 sm:gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 sm:gap-2">
                <h3 className="font-bold text-sm sm:text-base text-foreground truncate">
                  {token.symbol}
                </h3>
                <span className="text-[10px] sm:text-xs text-muted-foreground truncate hidden sm:inline">
                  {token.name}
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button 
                        className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                        onClick={handleCopyAddress}
                      >
                        <Copy className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy address</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 mt-0.5 sm:mt-1">
                <span className="text-[10px] sm:text-xs text-muted-foreground">{token.timeAgo}</span>
                <div className="flex items-center gap-0.5 sm:gap-1">
                  <Users className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-muted-foreground" />
                  <span className="text-[10px] sm:text-xs text-muted-foreground">{token.holders}</span>
                </div>
                <div className="hidden sm:flex items-center gap-1">
                  <Globe className="h-3 w-3 text-muted-foreground hover:text-primary transition-colors cursor-pointer" onClick={(e) => e.stopPropagation()} />
                  <LineChart className="h-3 w-3 text-muted-foreground hover:text-primary transition-colors cursor-pointer" onClick={(e) => e.stopPropagation()} />
                  <Activity className="h-3 w-3 text-muted-foreground hover:text-primary transition-colors cursor-pointer" onClick={(e) => e.stopPropagation()} />
                </div>
              </div>
            </div>

            {/* Market Cap & Price */}
            <div className="text-right flex-shrink-0">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="text-[10px] sm:text-xs text-info font-medium cursor-help">
                      MC {formatCompact(token.marketCap)}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Market Cap: ${token.marketCap.toLocaleString()}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="text-[10px] sm:text-xs text-muted-foreground cursor-help">
                      V {formatCompact(token.volume24h)}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>24h Volume: ${token.volume24h.toLocaleString()}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div 
                className={cn(
                  "text-xs sm:text-sm font-mono font-bold transition-colors duration-300",
                  priceChange === "up" && "text-success",
                  priceChange === "down" && "text-destructive",
                  !priceChange && "text-foreground"
                )}
              >
                ${formatPrice(displayPrice)}
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-xs overflow-x-auto scrollbar-hide">
            {/* Price Change */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className={cn(
                    "flex items-center gap-0.5 sm:gap-1 font-semibold cursor-help flex-shrink-0",
                    isPositive ? "text-success" : "text-destructive"
                  )}>
                    <ArrowUpRight className={cn("h-2.5 w-2.5 sm:h-3 sm:w-3", !isPositive && "rotate-90")} />
                    <span>{isPositive ? "+" : ""}{change24h.toFixed(1)}%</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>24h Price Change</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Additional Metrics */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-0.5 sm:gap-1 text-info cursor-help flex-shrink-0">
                    <span className="text-muted-foreground">5m</span>
                    <span>{isPositive ? "+" : ""}{(Math.random() * 10 - 5).toFixed(1)}%</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>5min Price Change</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-0.5 sm:gap-1 text-success cursor-help flex-shrink-0">
                    <span className="text-muted-foreground">1h</span>
                    <span>{(Math.random() * 5).toFixed(1)}%</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>1hour Price Change</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-0.5 sm:gap-1 text-warning cursor-help flex-shrink-0">
                    <span className="text-muted-foreground">6h</span>
                    <span>{(Math.random() * 8 - 4).toFixed(1)}%</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>6hour Price Change</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="hidden sm:flex items-center gap-1 text-muted-foreground cursor-help flex-shrink-0">
                    <span className="text-muted-foreground">24h</span>
                    <span>{(Math.random() * 12 - 6).toFixed(1)}%</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>24hour Price Change</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Progress and Metrics Row */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Bonding Progress */}
            {token.bondingProgress !== undefined && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1 sm:gap-2 flex-1 cursor-help">
                      <Progress value={token.bondingProgress} className="h-1 sm:h-1.5 flex-1" />
                      <span className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">
                        {token.bondingProgress.toFixed(0)}%
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Bonding Curve Progress</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {/* Liquidity Factor */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs cursor-help flex-shrink-0">
                    <Droplet className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-info" />
                    <span className="text-muted-foreground">F</span>
                    <span className="text-foreground font-medium">
                      {(token.liquidity / token.marketCap).toFixed(2)}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Liquidity Factor: ${formatCompact(token.liquidity)}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Transaction Count */}
            {token.txCount && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="hidden sm:flex items-center gap-1 text-xs cursor-help flex-shrink-0">
                      <BarChart3 className="h-3 w-3 text-warning" />
                      <span className="text-muted-foreground">Tx</span>
                      <span className="text-foreground font-medium">{token.txCount}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Total Transactions</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>

        {/* Trade Button */}
        <div className="flex-shrink-0">
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-2 sm:px-4 h-7 sm:h-8 text-xs sm:text-sm"
            onClick={(e) => {
              e.stopPropagation();
              // Trade action
            }}
          >
            <span className="hidden sm:inline">0 SOL</span>
            <span className="sm:hidden">Trade</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}

function formatCompact(num: number): string {
  if (num >= 1e9) return "$" + (num / 1e9).toFixed(1) + "B";
  if (num >= 1e6) return "$" + (num / 1e6).toFixed(1) + "M";
  if (num >= 1e3) return "$" + (num / 1e3).toFixed(1) + "K";
  return "$" + num.toFixed(0);
}

function formatPrice(num: number): string {
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  if (num >= 1) return num.toFixed(2);
  if (num >= 0.01) return num.toFixed(4);
  return num.toFixed(6);
}
