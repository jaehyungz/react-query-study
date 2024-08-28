"use client";

import { queryKeys } from "@/api/key-factory";
import { getUsers, User } from "@/api/queries";
import { getPosts, Post } from "@/api/queries/posts";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Props {}

function HydrationPostList(props: Props) {
  const {} = props;

  const queryClient = useQueryClient();

  const [pageNum, setPageNum] = useState(1);

  const { data } = getPosts(pageNum);

  const { data: users } = getUsers();
  // const data: Post[] = [];

  useEffect(() => {
    const nextPage = pageNum + 1;

    queryClient.prefetchQuery(queryKeys.post.list(nextPage));
  }, [pageNum]);

  // const { data, error } = useQuery(queryKeys.users.list());

  //   const data: User[] = [];
  // const clientValue = useQuery(queryKeys.users.list());
  //   const clientValue: { data: User[] } = { data: [] };

  return (
    <div className="grid-list">
      <div className="box">
        <div className="list">
          {data?.map((item, idx) => {
            return (
              <div key={item.id} className="item">
                <div className="text">
                  <p>id : {item.id}</p>
                  <p>userId : {item.userId}</p>
                  <strong>url : {item.title}</strong>
                  <p>url : {item.body}</p>
                </div>

                {/* <Link href={`/user/${item.id}`}>상세가기</Link> */}
              </div>
            );
          })}
        </div>
        <div className="buttons">
          <button onClick={() => setPageNum((prev) => prev - 1)}>이전</button>
          <button onClick={() => setPageNum((prev) => prev + 1)}>다음</button>
        </div>
      </div>
      <div className="box">
        {users?.map((item, idx) => {
          return (
            <div key={item.id} className="user-item">
              {/* <Image
              src={item.avatar_url}
              alt={item.id.toString()}
              width={100}
              height={100}
              unoptimized={true}
            /> */}
              <div className="text">
                <p>id : {item.id}</p>
                <p>nodeId : {item.node_id}</p>
                <p>url : {item.url}</p>
              </div>

              <Link href={`/user/${item.id}`}>상세가기</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HydrationPostList;
