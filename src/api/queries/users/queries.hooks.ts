import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { User } from "./type";

export const useGetUser = (enabled: boolean) => {
  return useQuery({
    queryKey: ["useGetUser"],
    queryFn: async () => {
      const baseURL = "https://api.github.com/users";
      const response = await fetch(baseURL);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const users: User[] = await response.json();
      return users;
    },
    enabled: enabled,
  });
};
