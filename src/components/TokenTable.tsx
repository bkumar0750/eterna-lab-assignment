import { useState, useMemo } from "react";
import { Token, SortField, SortDirection } from "@/types/token";
import { TokenRow } from "./TokenRow";
import { TokenDetailModal } from "./TokenDetailModal";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TokenTableProps {
  tokens: Token[];
  prices: Map<string, number>;
  priceChanges: Map<string, "up" | "down" | null>;
}

export function TokenTable({ tokens, prices, priceChanges }: TokenTableProps) {
  const [sortField, setSortField] = useState<SortField>("volume24h");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const sortedTokens = useMemo(() => {
    return [...tokens].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Use current price if sorting by price
      if (sortField === "price") {
        aValue = prices.get(a.id) ?? a.price;
        bValue = prices.get(b.id) ?? b.price;
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });
  }, [tokens, sortField, sortDirection, prices]);

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
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      {/* Table Header */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 md:gap-4 p-3 md:p-4 bg-secondary/50 border-b border-border text-xs md:text-sm font-semibold text-muted-foreground">
        <div>Token</div>
        <SortHeader
          label="Price"
          field="price"
          currentField={sortField}
          direction={sortDirection}
          onSort={handleSort}
        />
        <SortHeader
          label="24h %"
          field="priceChange24h"
          currentField={sortField}
          direction={sortDirection}
          onSort={handleSort}
          className="hidden md:block"
        />
        <SortHeader
          label="Volume"
          field="volume24h"
          currentField={sortField}
          direction={sortDirection}
          onSort={handleSort}
          className="hidden md:block"
        />
        <SortHeader
          label="Market Cap"
          field="marketCap"
          currentField={sortField}
          direction={sortDirection}
          onSort={handleSort}
          className="hidden lg:block"
        />
        <SortHeader
          label="Liquidity"
          field="liquidity"
          currentField={sortField}
          direction={sortDirection}
          onSort={handleSort}
          className="hidden lg:block"
        />
        <div className="text-right hidden lg:block">Actions</div>
        <div className="text-right md:hidden">•••</div>
      </div>

      {/* Table Body */}
      <div>
        {sortedTokens.map((token) => (
          <TokenRow
            key={token.id}
            token={token}
            currentPrice={prices.get(token.id)}
            priceChange={priceChanges.get(token.id)}
            onViewDetails={() => handleViewDetails(token)}
          />
        ))}
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

interface SortHeaderProps {
  label: string;
  field: SortField;
  currentField: SortField;
  direction: SortDirection;
  onSort: (field: SortField) => void;
  className?: string;
}

function SortHeader({
  label,
  field,
  currentField,
  direction,
  onSort,
  className,
}: SortHeaderProps) {
  const isActive = currentField === field;

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "h-auto p-0 hover:bg-transparent font-semibold justify-start",
        isActive && "text-primary",
        className
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
