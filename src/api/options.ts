import {
  Query,
  QueryClientConfig,
  defaultShouldDehydrateQuery,
} from "@tanstack/react-query";

const queryClientOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      // staleTime: 1000 * 60 * 5,

      // retry: 1,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
    dehydrate: {
      // per default, only successful Queries are included,
      // this includes pending Queries as well
      shouldDehydrateQuery: (query: Query) => {
        return true;
        // defaultShouldDehydrateQuery(query) || query.state.status === "pending",
      },
    },
  },
};

export default queryClientOptions;
