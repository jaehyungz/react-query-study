import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

import { queryKeys } from "@/api/key-factory";
import { User } from "../users";
import { fetcher } from "@/api/fetcher";

const createAccessToken = (options?: UseMutationOptions) => {
  return useMutation({
    mutationKey: ["createAccessToken"],
    mutationFn: createAccessTokenFn,
    ...options,
  });
};

const createAccessTokenFn = async () => {
  const baseURL = "https://dummyjson.com/auth/login";
  const response = await fetcher(baseURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "emilysz",
      password: "emilyspass",
      expiresInMins: 30, // optional, defaults to 60
    }),
    // credentials: "include",
  });
  console.log(response);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  return data;
};

export { createAccessToken, createAccessTokenFn };
