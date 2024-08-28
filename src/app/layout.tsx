import type { Metadata } from "next";
import "./globals.css";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import Providers from "@/lib/provider";
// import { QueryClientProvider } from "@tanstack/react-query";
import { ClientProvider } from "@/api";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "./error";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          <ReactQueryDevtools initialIsOpen={false} />

          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
