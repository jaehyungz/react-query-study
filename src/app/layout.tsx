import type { Metadata } from "next";
import "./globals.css";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import Providers from "@/lib/provider";
// import { QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "./error";
import { ClientProvider } from "@/lib/react-query";
import { Toaster } from "react-hot-toast";

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
          <Toaster />

          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
