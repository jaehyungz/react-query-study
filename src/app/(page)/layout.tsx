import type { Metadata } from "next";
import "./globals.css";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import Providers from "@/lib/provider";
// import { QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "./error";
import { ClientProvider } from "@/lib/react-query";
import { Toaster } from "react-hot-toast";
import LayoutSection from "../components/LayoutSection";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Script
          strategy="beforeInteractive"
          type="text/javascript"
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}&submodules=geocoder`}
        />

        <ClientProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster />
          <LayoutSection>{children}</LayoutSection>
        </ClientProvider>
      </body>
    </html>
  );
}
