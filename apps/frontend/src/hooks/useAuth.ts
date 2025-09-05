import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher, API_BASE } from "../api";

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) =>
      fetcher(`${API_BASE}/auth/login`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () =>
      fetcher(`${API_BASE}/auth/logout`, {
        method: "POST",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });
}

export function useAuth() {
  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => fetcher<{ user?: { email: string } }>(`${API_BASE}/profile`),
  });
}
