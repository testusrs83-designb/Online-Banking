import { useQuery } from "@tanstack/react-query";
import { fetcher, API_BASE } from "../api";

export function useAccounts() {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: async () => fetcher(`${API_BASE}/accounts`),
  });
}
