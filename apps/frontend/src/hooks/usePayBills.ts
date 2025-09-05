import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher, API_BASE } from "../api";

export function usePayBills() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { payee: string; amount: number; date: string }) =>
      fetcher(`${API_BASE}/pay-bills`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
}
