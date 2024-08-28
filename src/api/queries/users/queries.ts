import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { User } from "./type";
import { queryKeys } from "@/api/key-factory";

const getUsers = () => {
  return useQuery({
    queryKey: queryKeys.users.list()["queryKey"],
    queryFn: queryKeys.users.list()["queryFn"],
    placeholderData: [],
    staleTime: 1000 * 60 * 60,
    // staleTime: 1000,
    // gcTime: 1000 * 60,
    // networkMode: "offlineFirst",
    // networkMode: "online",
  });
};

const getUsersFn = async () => {
  const baseURL = "https://api.github.com/users";
  const response = await fetch(baseURL);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const users: User[] = await response.json();
  return users;
};

const getUser = (id: string) => {
  return useQuery(queryKeys.users.detail(id));
};

const getUserFn = async (id: string) => {
  const baseURL = `https://api.github.com/users/${id}`;
  const response = await fetch(baseURL);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const user: User = await response.json();
  return user;
};

export { getUsers, getUser, getUsersFn, getUserFn };
