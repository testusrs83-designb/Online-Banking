import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher, API_BASE } from "../api";

export function useTransfer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { from: string; to: string; amount: number }) =>
      fetcher(`${API_BASE}/transfer`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts", "transactions"] });
    },
  });
}
