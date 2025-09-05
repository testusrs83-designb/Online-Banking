import { useQuery } from "@tanstack/react-query";
import { fetcher, API_BASE } from "../api";

export function useTransactions() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () => fetcher(`${API_BASE}/transactions`),
  });
}
