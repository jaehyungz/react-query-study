"use client";

import {
  QueryCache,
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from "@tanstack/react-query";

import React, { useMemo } from "react";
import useApiError from "@/app/hooks/useApiError";

function makeQueryClient(options: QueryClientConfig) {
  return new QueryClient(options);
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient(options: QueryClientConfig) {
  //서버
  if (typeof window === "undefined") {
    return makeQueryClient(options);
  } else {
    //클라이언트
    if (!browserQueryClient) browserQueryClient = makeQueryClient(options);
    return browserQueryClient;
  }
}

export const ClientProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { handleError } = useApiError();

  const options: QueryClientConfig = {
    queryCache: new QueryCache({
      onError: (error, query) => {
        handleError(error);
      },
    }),

    defaultOptions: {
      queries: {
        // staleTime: 1000 * 60 * 5,

        // retry: 1,
        retry: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      },

      // dehydrate: {
      //   // per default, only successful Queries are included,
      //   // this includes pending Queries as well
      //   shouldDehydrateQuery: (query: Query) => {
      //     return true;
      //     // defaultShouldDehydrateQuery(query) || query.state.status === "pending",
      //   },
      // },
    },
  };

  const queryClient = getQueryClient(options);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
