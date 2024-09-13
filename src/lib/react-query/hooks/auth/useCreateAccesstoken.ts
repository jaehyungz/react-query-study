import { fetcher } from "@/lib";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import {
  useCreateAccesstokenReponse,
  useCreateAccesstokenVariables,
} from "../../types";

export const useCreateAccesstoken = (
  options?: UseMutationOptions<
    useCreateAccesstokenReponse,
    any,
    useCreateAccesstokenVariables
  >
) => {
  return useMutation({
    mutationKey: ["createAccessToken"],
    mutationFn: createAccessToken,
    ...options,
  });
};

const createAccessToken = async (res: useCreateAccesstokenVariables) => {
  const response = await fetcher("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: res.username,
      password: res.password,
      expiresInMins: 30, // optional, defaults to 60
    }),
    // credentials: "include",
  });

  const data = await response.json();

  return data;
};
