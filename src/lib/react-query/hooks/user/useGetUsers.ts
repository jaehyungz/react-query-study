import { fetcher, queryKeys } from "@/lib";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useGetUsersResponse } from "../../types/user";

const useGetUsers = (
  // options?: UseQueryOptions<useGetUserInfoReponse, any, any>
  skip: string,
  options?: Omit<UseQueryOptions<useGetUsersResponse, any, any>, "queryKey">
) => {
  return useQuery<useGetUsersResponse>({
    queryKey: queryKeys.user.list(skip)["queryKey"],
    queryFn: () => getUsers(skip),
    ...options,
  });
};

const getUsers = async (skip: string) => {
  /* providing token in bearer */
  const response = await fetcher(`/users?limit=5&skip=${skip}`);

  const data: useGetUsersResponse = await response.json();

  return data;
};

export { useGetUsers };
