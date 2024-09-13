import { Query, QueryCache, QueryClientConfig } from "@tanstack/react-query";
import toast from "react-hot-toast";

const queryClientOptions: QueryClientConfig = {
  queryCache: new QueryCache({
    onError: (e) => toast.error(e.message),
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

export default queryClientOptions;
