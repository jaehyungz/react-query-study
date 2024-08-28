import { queryKeys } from "@/api/key-factory";
import { useQuery } from "@tanstack/react-query";
import { Post } from "./type";

const getPosts = (pageNum: number) => {
  return useQuery({
    queryKey: queryKeys.post.list(pageNum)["queryKey"],
    queryFn: queryKeys.post.list(pageNum)["queryFn"],
    staleTime: 1000 * 60 * 60,
    // staleTime: 1000,
    // gcTime: 1000 * 60,
    networkMode: "offlineFirst",
    // networkMode: "online",
  });
};

const getPostsFn = async (pageNum: number) => {
  const baseURL = `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`;
  const response = await fetch(baseURL);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const posts: Post[] = await response.json();
  return posts;
};

export { getPosts, getPostsFn };
