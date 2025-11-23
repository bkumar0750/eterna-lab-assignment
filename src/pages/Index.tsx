import { useState, useEffect, useMemo } from "react";
import { TokenGrid } from "@/components/TokenGrid";
import { TokenTableSkeleton } from "@/components/TokenSkeleton";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { generateMockTokens } from "@/lib/mockData";
import { useRealtimePrice } from "@/hooks/useRealtimePrice";
import { Token } from "@/types/token";
import { Zap, TrendingUp, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { SubHeader } from "@/components/SubHeader";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [newTokens, setNewTokens] = useState<Token[]>([]);
  const [trendingTokens, setTrendingTokens] = useState<Token[]>([]);
  const [migratedTokens, setMigratedTokens] = useState<Token[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Real-time price updates for all tokens
  const allTokens = [...newTokens, ...trendingTokens, ...migratedTokens];
  const { prices, priceChanges } = useRealtimePrice(allTokens, 3000);

  // Load mock data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setNewTokens(generateMockTokens(15, "new"));
      setTrendingTokens(generateMockTokens(15, "trending"));
      setMigratedTokens(generateMockTokens(15, "migrated"));
      setLoading(false);
    };

    loadData();
  }, []);

  // Filter tokens based on search query
  const filterTokens = (tokens: Token[]) => {
    if (!searchQuery.trim()) return tokens;
    
    const query = searchQuery.toLowerCase();
    return tokens.filter(token => 
      token.symbol.toLowerCase().includes(query) ||
      token.name.toLowerCase().includes(query) ||
      token.id.toLowerCase().includes(query)
    );
  };

  const filteredNewTokens = useMemo(() => filterTokens(newTokens), [newTokens, searchQuery]);
  const filteredTrendingTokens = useMemo(() => filterTokens(trendingTokens), [trendingTokens, searchQuery]);
  const filteredMigratedTokens = useMemo(() => filterTokens(migratedTokens), [migratedTokens, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      {/* Sub Header */}
      <SubHeader />

      {/* Main Content */}
      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 flex-1 min-h-0">

        <ErrorBoundary>
          {loading ? (
            <TokenTableSkeleton />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 h-[calc(110vh-280px)]">
              {/* New Pairs Column */}
              <div className="flex flex-col min-h-0">
                <div className="flex items-center gap-2 mb-3 sm:mb-4 px-1">
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                  <h2 className="text-base sm:text-lg font-bold">New Pairs</h2>
                  <Button variant="ghost" size="sm" className="ml-auto h-6 sm:h-7 text-xs px-2">
                    ⚡ {filteredNewTokens.length}
                  </Button>
                </div>
                <ScrollArea className="flex-1 pr-2">
                  <TokenGrid
                    tokens={filteredNewTokens}
                    prices={prices}
                    priceChanges={priceChanges}
                    title=""
                  />
                </ScrollArea>
              </div>

              {/* Final Stretch (Trending) Column */}
              <div className="flex flex-col min-h-0">
                <div className="flex items-center gap-2 mb-3 sm:mb-4 px-1">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-warning flex-shrink-0" />
                  <h2 className="text-base sm:text-lg font-bold">Final Stretch</h2>
                  <Button variant="ghost" size="sm" className="ml-auto h-6 sm:h-7 text-xs px-2">
                    ⚡ {filteredTrendingTokens.length}
                  </Button>
                </div>
                <ScrollArea className="flex-1 pr-2">
                  <TokenGrid
                    tokens={filteredTrendingTokens}
                    prices={prices}
                    priceChanges={priceChanges}
                    title=""
                  />
                </ScrollArea>
              </div>

              {/* Migrated Column */}
              <div className="flex flex-col min-h-0">
                <div className="flex items-center gap-2 mb-3 sm:mb-4 px-1">
                  <Rocket className="h-4 w-4 sm:h-5 sm:w-5 text-success flex-shrink-0" />
                  <h2 className="text-base sm:text-lg font-bold">Migrated</h2>
                  <Button variant="ghost" size="sm" className="ml-auto h-6 sm:h-7 text-xs px-2">
                    ⚡ {filteredMigratedTokens.length}
                  </Button>
                </div>
                <ScrollArea className="flex-1 pr-2">
                  <TokenGrid
                    tokens={filteredMigratedTokens}
                    prices={prices}
                    priceChanges={priceChanges}
                    title=""
                  />
                </ScrollArea>
              </div>
            </div>
          )}
        </ErrorBoundary>
      </main>

      {/* Footer */}
      
<footer className="w-full h-12 border-t border-border bg-background/80 backdrop-blur-md flex items-center ">
  <div className="w-full max-w-screen-2xl mx-auto px-3 sm:px-4 flex items-center justify-between ">

    {/* LEFT SECTION */}
    <div className="flex items-center gap-6 text-xs text-muted-foreground">

      {/* Preset Button */}
      <button className="px-3 py-1 rounded-md bg-primary/20 text-primary text-[11px] font-semibold hover:bg-primary/30 transition">
        PRESET 1
      </button>

      {/* Small metric badges */}
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-4">
          <span className="text-[10px] opacity-70">1</span>
          <span className="text-primary">$0</span>
        </span>
      </div>

      {/* Links */}
      <div className="hidden md:flex items-center gap-10 text-[11px]">
        <span className="cursor-pointer hover:text-foreground">Wallet</span>
        <span className="cursor-pointer hover:text-foreground">Twitter</span>
        <span className="cursor-pointer hover:text-foreground">Discover</span>
        <span className="cursor-pointer hover:text-foreground">Pulse</span>
        <span className="cursor-pointer hover:text-foreground">PnL</span>
      </div>

      {/* Tokens & Values */}
      <div className="hidden lg:flex items-center gap-10 text-[11px]">
        <span className="text-orange-400">$86.2K</span>
        <span className="text-blue-400">$2809</span>
        <span className="text-green-400">$129.6</span>
        <span className="text-slate-400">$53.3K</span>
        <span className="text-slate-400">0.21</span>
        <span className="text-slate-400">0.003</span>
      </div>
    </div>

    {/* RIGHT SECTION */}
    <div className="flex items-center gap-10 text-xs text-muted-foreground">

      {/* Connection Badge */}
      <div className="flex items-center gap-2 bg-green-600/20 px-3 py-[3px] rounded-md">
        <span className="h-2 w-2 rounded-full bg-green-500"></span>
        <span className="text-green-500 font-medium">Connection is stable</span>
      </div>

      {/* Global */}
      <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">
        GLOBAL
        <svg width="12" height="12" className="opacity-70"><path d="M6 9L2 3h8L6 9z" fill="currentColor"/></svg>
      </div>

      {/* Icons */}
      <div className="flex items-center gap-10 text-[15px]">
        <span className="cursor-pointer hover:text-foreground">▢</span>
        <span className="cursor-pointer hover:text-foreground">🔔</span>
        <span className="cursor-pointer hover:text-foreground">🎮</span>
        <span className="cursor-pointer hover:text-foreground">✖</span>
        <span className="cursor-pointer hover:text-foreground">@</span>
      </div>
    </div>
  </div>
</footer>

    </div>
  );
};

export default Index;
