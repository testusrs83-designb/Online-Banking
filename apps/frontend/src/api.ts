// Centralized API client for frontend-backend communication
import { QueryClient } from "@tanstack/react-query";

export const API_BASE = "/api";

export async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export const queryClient = new QueryClient();
