import { Token } from "@/types/token";

const tokenNames = [
  { symbol: "SPIRIT", name: "Spirit Token" },
  { symbol: "PAINT", name: "Paint Dry" },
  { symbol: "ALPHA", name: "Alphabet Coin" },
  { symbol: "A858", name: "A858 Cutt" },
  { symbol: "MEXC", name: "MEXC Token" },
  { symbol: "GOOGLE", name: "Google Token" },
  { symbol: "COCA", name: "CocaCola" },
  { symbol: "ZKTELL", name: "Zktell Protocol" },
  { symbol: "888", name: "888 Abundance" },
  { symbol: "SON", name: "SON Token" },
  { symbol: "MEOW", name: "Meow Cat" },
  { symbol: "DOGE", name: "Doge Coin" },
  { symbol: "PEPE", name: "Pepe" },
  { symbol: "SHIB", name: "Shiba Inu" },
  { symbol: "CRYPTO", name: "Crypto Token" },
];

export function generateMockTokens(count: number, status: Token["status"]): Token[] {
  const timeAgoOptions = ["4s", "6s", "12s", "2m", "20s", "4m", "1m", "52s", "2s"];
  
  return Array.from({ length: count }, (_, i) => {
    const tokenInfo = tokenNames[i % tokenNames.length];
    const basePrice = Math.random() * 1000;
    const priceChange = (Math.random() - 0.5) * 200;
    
    return {
      id: `${status}-${i}`,
      symbol: `${tokenInfo.symbol}${i > 14 ? i : ""}`,
      name: `${tokenInfo.name}${i > 14 ? ` ${i}` : ""}`,
      price: basePrice,
      priceChange24h: priceChange,
      volume24h: Math.random() * 10000000,
      marketCap: Math.random() * 100000000,
      liquidity: Math.random() * 5000000,
      holders: Math.floor(Math.random() * 10000),
      createdAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      status,
      timeAgo: timeAgoOptions[Math.floor(Math.random() * timeAgoOptions.length)],
      fdv: Math.random() * 1000,
      txCount: Math.floor(Math.random() * 200),
      bondingProgress: Math.floor(Math.random() * 100),
    };
  });
}

export function simulatePriceUpdate(currentPrice: number): number {
  const change = (Math.random() - 0.5) * 0.1; // ±5% change
  return Math.max(0.000001, currentPrice * (1 + change));
}
