import { fetcher } from "@/lib";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useGetUserInfoReponse } from "../../types";

export const useGetUserInfo = (
  // options?: UseQueryOptions<useGetUserInfoReponse, any, any>
  options?: Omit<UseQueryOptions<useGetUserInfoReponse, any, any>, "queryKey">
) => {
  return useQuery({
    queryKey: ["getUserInfo"],
    queryFn: getUserInfo,
    ...options,
  });
};

const getUserInfo = async () => {
  /* providing token in bearer */
  const response = await fetcher("/auth/me");

  const data: useGetUserInfoReponse = await response.json();

  return data;
};
