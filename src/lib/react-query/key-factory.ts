import {
  createQueryKeys,
  inferQueryKeyStore,
  mergeQueryKeys,
} from "@lukemorales/query-key-factory";

const userKeys = createQueryKeys("user", {
  info: () => ({
    queryKey: ["getUser"],
  }),
  list: (skip) => ({
    queryKey: ["getUsers", skip],
  }),
  detail: (userId) => ({
    queryKey: ["getUserDetail", userId],
  }),
});

const authKeys = {
  signIn: ["sign-in"],
};

const userMutationKeys = {
  user: {
    create: ["user", "create"],
  },
};

export const mutationKeys = { ...authKeys, ...userMutationKeys };

export const queryKeys = mergeQueryKeys(userKeys);

export type QueryKeys = inferQueryKeyStore<typeof queryKeys>;
