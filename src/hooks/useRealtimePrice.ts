import { useState, useEffect, useCallback } from "react";
import { simulatePriceUpdate } from "@/lib/mockData";
import { Token } from "@/types/token";

export function useRealtimePrice(tokens: Token[], updateInterval = 3000) {
  const [prices, setPrices] = useState<Map<string, number>>(
    new Map(tokens.map((t) => [t.id, t.price]))
  );
  const [priceChanges, setPriceChanges] = useState<Map<string, "up" | "down" | null>>(
    new Map()
  );

  const updatePrices = useCallback(() => {
    setPrices((prev) => {
      const newPrices = new Map(prev);
      const changes = new Map<string, "up" | "down" | null>();

      tokens.forEach((token) => {
        const currentPrice = prev.get(token.id) || token.price;
        const newPrice = simulatePriceUpdate(currentPrice);
        newPrices.set(token.id, newPrice);
        
        if (newPrice > currentPrice) {
          changes.set(token.id, "up");
        } else if (newPrice < currentPrice) {
          changes.set(token.id, "down");
        }
      });

      setPriceChanges(changes);
      
      // Clear animations after they complete
      setTimeout(() => {
        setPriceChanges(new Map());
      }, 600);

      return newPrices;
    });
  }, [tokens]);

  useEffect(() => {
    const interval = setInterval(updatePrices, updateInterval);
    return () => clearInterval(interval);
  }, [updatePrices, updateInterval]);

  return { prices, priceChanges };
}
