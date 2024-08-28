"use client";
import { getQueryClient } from "@/api";
import { queryKeys } from "@/api/key-factory";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import React, { Suspense } from "react";
import HydrationPostList from "../components/HydrationPostList";

interface Props {}

function Hydration(props: Props) {
  const client = useQueryClient();
  //   const {} = props;
  //   const client = getQueryClient();
  //   const client = new QueryClient();

  //   await client.prefetchQuery(queryKeys.users.list());

  return (
    <HydrationBoundary state={dehydrate(client)}>
      {/* <Suspense
        fallback={
          <div style={{ width: 300, height: 300, backgroundColor: "red" }}>
            loading...
          </div>
        }
      > */}
      <HydrationPostList />
      {/* </Suspense> */}
    </HydrationBoundary>
  );
}

export default Hydration;
