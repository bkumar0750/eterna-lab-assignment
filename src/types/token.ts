export interface Token {
  id: string;
  symbol: string;
  name: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  liquidity: number;
  holders: number;
  createdAt: string;
  status: "new" | "trending" | "migrated";
  logo?: string;
  timeAgo?: string;
  fdv?: number;
  txCount?: number;
  bondingProgress?: number;
}

export type SortField = "price" | "priceChange24h" | "volume24h" | "marketCap" | "liquidity" | "holders";
export type SortDirection = "asc" | "desc";
