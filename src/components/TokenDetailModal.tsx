import { Token } from "@/types/token";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { PriceCell, ChangePercent } from "./PriceCell";
import { TrendingUp, Users, Droplets, BarChart3 } from "lucide-react";

interface TokenDetailModalProps {
  token: Token | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPrice?: number;
}

export function TokenDetailModal({
  token,
  open,
  onOpenChange,
  currentPrice,
}: TokenDetailModalProps) {
  if (!token) return null;

  const displayPrice = currentPrice ?? token.price;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-card border-border">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xl font-bold text-primary">
                {token.symbol.charAt(0)}
              </span>
            </div>
            <div>
              <DialogTitle className="text-2xl">{token.name}</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {token.symbol}
              </DialogDescription>
            </div>
            <Badge
              variant={token.status === "new" ? "default" : "secondary"}
              className="ml-auto"
            >
              {token.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Price Section */}
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Current Price</div>
            <div className="flex items-baseline gap-3">
              <PriceCell price={displayPrice} className="text-3xl" />
              <ChangePercent change={token.priceChange24h} className="text-lg" />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              icon={<BarChart3 className="h-5 w-5" />}
              label="24h Volume"
              value={`$${formatNumber(token.volume24h)}`}
            />
            <StatCard
              icon={<TrendingUp className="h-5 w-5" />}
              label="Market Cap"
              value={`$${formatNumber(token.marketCap)}`}
            />
            <StatCard
              icon={<Droplets className="h-5 w-5" />}
              label="Liquidity"
              value={`$${formatNumber(token.liquidity)}`}
            />
            <StatCard
              icon={<Users className="h-5 w-5" />}
              label="Holders"
              value={formatNumber(token.holders)}
            />
          </div>

          {/* Additional Info */}
          <div className="pt-4 border-t border-border space-y-2">
            <InfoRow label="Created" value={new Date(token.createdAt).toLocaleString()} />
            <InfoRow label="Token ID" value={token.id} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-secondary/50 rounded-lg p-4 space-y-1">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function formatNumber(num: number): string {
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
  return num.toFixed(0);
}
