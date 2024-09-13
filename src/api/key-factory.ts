import {
  createQueryKeys,
  createQueryKeyStore,
  inferQueryKeyStore,
  mergeQueryKeys,
} from "@lukemorales/query-key-factory";
import { getUsersFn, getUserFn } from "./queries";
import {} from "./queries";
import { getEmployeesFn } from "./queries/employee";
import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { getPostsFn } from "./queries/posts";
import { createAccessTokenFn } from "./queries/auth/queries";

const userKeys = createQueryKeys("users", {
  list: () => ({
    queryKey: ["getUsers"],
    queryFn: () => getUsersFn(),
  }),
  detail: (userId: string) => ({
    queryKey: ["getUser", userId],
    queryFn: () => getUserFn(userId),
  }),
});

const employeeKeys = createQueryKeys("employee", {
  list: () => ({
    queryKey: ["getEmployee"],
    queryFn: () => getEmployeesFn(),
  }),
  // detail: (employeeId: string) => ({
  //   queryKey: ["getUser", employeeId],
  //   queryFn: () => getUserFn(employeeId),
  // }),
});

const postKeys = createQueryKeys("post", {
  list: (pageNum) => ({
    queryKey: ["getPosts", pageNum],
    queryFn: () => getPostsFn(pageNum),
  }),
});

// const authKeys = createQueryKeys("auth", {
//   login: {
//     queryKey: ["createAccessToken"],
//     queryFn: (() => createAccessTokenFn()) as UseMutationOptions["mutationFn"],
//   },

//   // mutationKey: ["createAccessToken"],
//   // mutationFn: () => createAccessTokenFn(),

//   // list: (pageNum) => ({
//   //   mutationKey: ["getPosts", pageNum],
//   //   mutationFn: () => getPostsFn(pageNum),
//   // }),
// });

export const queryKeys = mergeQueryKeys(
  userKeys,
  employeeKeys,
  postKeys
  // authKeys
);

export type QueryKeys = inferQueryKeyStore<typeof queryKeys>;
