import { QueryClient } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
}

export async function apiRequest(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  body?: any
): Promise<any> {
  const response = await fetch(`${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  await throwIfResNotOk(response);
  return response.json();
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const response = await fetch(`${queryKey[0]}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});