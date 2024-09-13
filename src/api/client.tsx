"use client";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
  queryOptions,
} from "@tanstack/react-query";
import queryClientOptions from "./options";
import React, { useMemo } from "react";
import { redirect } from "next/dist/server/api-utils";
import { usePathname, useRouter } from "next/navigation";

function isLoggedInClient() {
  if (typeof window === "undefined") return false;

  const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
    const [key, value] = cookie.split("=");
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  return Boolean(cookies["authToken"]); // 'authToken' 쿠키가 존재하는지 확인
}

function makeQueryClient() {
  return new QueryClient(queryClientOptions);
}
function makeQueryCache() {
  return new QueryCache();
}

let browserQueryClient: QueryClient | undefined = undefined;
let browserQueryCache: QueryCache | undefined = undefined;

export function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client

    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export function getQueryCache() {
  if (typeof window === "undefined") {
    // Server: always make a new query client

    return makeQueryCache();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryCache) browserQueryCache = makeQueryCache();
    return browserQueryCache;
  }
}

export const ClientProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const queryClient = getQueryClient();
  const queryCache = getQueryCache();

  console.log(queryClient);
  console.log(queryCache);

  queryCache.config = useMemo(
    () => ({
      onError: (e) => {
        console.log(e);
        alert(e.message);
      },
    }),
    [pathname, router]
  );

  // const [queryClient] = React.useState(
  //   () => new QueryClient(queryClientOptions)
  // );
  // const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
