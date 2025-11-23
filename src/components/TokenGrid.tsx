import { useState, useMemo } from "react";
import { Token, SortField, SortDirection } from "@/types/token";
import { TokenCard } from "./TokenCard";
import { TokenDetailModal } from "./TokenDetailModal";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TokenGridProps {
  tokens: Token[];
  prices: Map<string, number>;
  priceChanges: Map<string, "up" | "down" | null>;
  title: string;
}

export function TokenGrid({ tokens, prices, priceChanges, title }: TokenGridProps) {
  const [sortField, setSortField] = useState<SortField>("volume24h");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  // Filter states
  const [marketCapFilter, setMarketCapFilter] = useState<string>("all");
  const [volumeFilter, setVolumeFilter] = useState<string>("all");
  const [holderFilter, setHolderFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredAndSortedTokens = useMemo(() => {
    let filtered = [...tokens];

    // Market cap filter
    if (marketCapFilter !== "all") {
      filtered = filtered.filter((token) => {
        const mc = token.marketCap;
        switch (marketCapFilter) {
          case "under-100k":
            return mc < 100000;
          case "100k-500k":
            return mc >= 100000 && mc < 500000;
          case "500k-1m":
            return mc >= 500000 && mc < 1000000;
          case "1m-10m":
            return mc >= 1000000 && mc < 10000000;
          case "over-10m":
            return mc >= 10000000;
          default:
            return true;
        }
      });
    }

    // Volume filter
    if (volumeFilter !== "all") {
      filtered = filtered.filter((token) => {
        const vol = token.volume24h;
        switch (volumeFilter) {
          case "under-10k":
            return vol < 10000;
          case "10k-50k":
            return vol >= 10000 && vol < 50000;
          case "50k-100k":
            return vol >= 50000 && vol < 100000;
          case "100k-500k":
            return vol >= 100000 && vol < 500000;
          case "over-500k":
            return vol >= 500000;
          default:
            return true;
        }
      });
    }

    // Holder filter
    if (holderFilter !== "all") {
      filtered = filtered.filter((token) => {
        const holders = token.holders;
        switch (holderFilter) {
          case "under-100":
            return holders < 100;
          case "100-500":
            return holders >= 100 && holders < 500;
          case "500-1k":
            return holders >= 500 && holders < 1000;
          case "1k-5k":
            return holders >= 1000 && holders < 5000;
          case "over-5k":
            return holders >= 5000;
          default:
            return true;
        }
      });
    }

    // Sort
    return filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === "price") {
        aValue = prices.get(a.id) ?? a.price;
        bValue = prices.get(b.id) ?? b.price;
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });
  }, [tokens, sortField, sortDirection, prices, marketCapFilter, volumeFilter, holderFilter]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const handleViewDetails = (token: Token) => {
    setSelectedToken(token);
    setModalOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* Header with sorting and filters */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 text-xs",
              showFilters && "text-primary bg-primary/10"
            )}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-3 w-3 mr-1" />
            Filters
          </Button>
          <SortButton
            label="Price"
            field="price"
            currentField={sortField}
            direction={sortDirection}
            onSort={handleSort}
          />
          <SortButton
            label="MC"
            field="marketCap"
            currentField={sortField}
            direction={sortDirection}
            onSort={handleSort}
          />
          <SortButton
            label="Volume"
            field="volume24h"
            currentField={sortField}
            direction={sortDirection}
            onSort={handleSort}
          />
        </div>
      </div>

      {/* Filter Controls */}
      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-card border border-border rounded-lg">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Market Cap</label>
            <Select value={marketCapFilter} onValueChange={setMarketCapFilter}>
              <SelectTrigger className="h-9 bg-background">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border z-50">
                <SelectItem value="all">All Market Caps</SelectItem>
                <SelectItem value="under-100k">&lt; $100K</SelectItem>
                <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                <SelectItem value="1m-10m">$1M - $10M</SelectItem>
                <SelectItem value="over-10m">&gt; $10M</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">24h Volume</label>
            <Select value={volumeFilter} onValueChange={setVolumeFilter}>
              <SelectTrigger className="h-9 bg-background">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border z-50">
                <SelectItem value="all">All Volumes</SelectItem>
                <SelectItem value="under-10k">&lt; $10K</SelectItem>
                <SelectItem value="10k-50k">$10K - $50K</SelectItem>
                <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                <SelectItem value="over-500k">&gt; $500K</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Holders</label>
            <Select value={holderFilter} onValueChange={setHolderFilter}>
              <SelectTrigger className="h-9 bg-background">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border z-50">
                <SelectItem value="all">All Holders</SelectItem>
                <SelectItem value="under-100">&lt; 100</SelectItem>
                <SelectItem value="100-500">100 - 500</SelectItem>
                <SelectItem value="500-1k">500 - 1K</SelectItem>
                <SelectItem value="1k-5k">1K - 5K</SelectItem>
                <SelectItem value="over-5k">&gt; 5K</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Grid of cards */}
      <div className="grid grid-cols-1 gap-3">
        {filteredAndSortedTokens.length > 0 ? (
          filteredAndSortedTokens.map((token) => (
            <TokenCard
              key={token.id}
              token={token}
              currentPrice={prices.get(token.id)}
              priceChange={priceChanges.get(token.id)}
              onViewDetails={() => handleViewDetails(token)}
            />
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No tokens match the selected filters
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <TokenDetailModal
        token={selectedToken}
        open={modalOpen}
        onOpenChange={setModalOpen}
        currentPrice={selectedToken ? prices.get(selectedToken.id) : undefined}
      />
    </div>
  );
}

interface SortButtonProps {
  label: string;
  field: SortField;
  currentField: SortField;
  direction: SortDirection;
  onSort: (field: SortField) => void;
}

function SortButton({
  label,
  field,
  currentField,
  direction,
  onSort,
}: SortButtonProps) {
  const isActive = currentField === field;

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "h-8 text-xs",
        isActive && "text-primary bg-primary/10"
      )}
      onClick={() => onSort(field)}
    >
      {label}
      {isActive ? (
        direction === "asc" ? (
          <ArrowUp className="ml-1 h-3 w-3" />
        ) : (
          <ArrowDown className="ml-1 h-3 w-3" />
        )
      ) : (
        <ArrowUpDown className="ml-1 h-3 w-3 opacity-50" />
      )}
    </Button>
  );
}
