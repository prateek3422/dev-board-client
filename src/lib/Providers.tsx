"use client";
import { ThemeProvider as NextTheme } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextTheme attribute="data-theme" defaultTheme="system" enableSystem>
      {children}
    </NextTheme>
  );
}

export function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
