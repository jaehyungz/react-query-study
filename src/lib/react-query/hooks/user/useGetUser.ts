import { fetcher, queryKeys } from "@/lib";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useGetUserResponse } from "../../types/user";

const useGetUser = (
  userId: string,
  options?: Omit<UseQueryOptions<useGetUserResponse, any, any>, "queryKey">
) => {
  return useQuery<useGetUserResponse>({
    queryKey: queryKeys.user.detail(userId)["queryKey"],
    queryFn: () => getUser(userId),
    ...options,
  });
};

const getUser = async (userId: string) => {
  /* providing token in bearer */
  const response = await fetcher(`/users/${userId}`);

  const data: useGetUserResponse = await response.json();

  return data;
};

export { useGetUser };
