import { fetcher, mutationKeys } from "@/lib";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import {
  useCreateUserResponse,
  useCreateUserVariables,
} from "../../types/user";

export const useCreateUser = (
  options?: UseMutationOptions<
    useCreateUserResponse,
    any,
    useCreateUserVariables
  >
) => {
  return useMutation({
    mutationKey: mutationKeys.user.create,
    mutationFn: createUser,
    ...options,
  });
};

const createUser = async (res: useCreateUserVariables) => {
  const response = await fetcher("/users/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName: res.firstName,
      lastName: res.lastName,
      age: res.age, // optional, defaults to 60
    }),
  });

  const data = await response.json();

  return data;
};
