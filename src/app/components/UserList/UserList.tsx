"use client";

import { getQueryClient } from "@/api";
import { getUsers } from "@/api/queries";
import { useGetUser } from "@/api/queries/users/queries.hooks";
import { stat } from "fs";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface Props {}

function UserList() {
  const [state, setState] = useState(false);
  // const { data } = useGetUser(state);
  // const { data } = useGetUser();
  const { data } = getUsers();
  //   const asd = getUsersFn();
  //   const { data } = useQuery({
  //     queryKey: ["getUsers"],
  //     queryFn: () => getUsersFn(),
  //   });

  const client = getQueryClient();

  const handleResetCache = () => {
    console.log(client);
  };

  return (
    <div className="user-list">
      <button onClick={() => setState(true)}> 목록 가져오기</button>
      <button onClick={() => handleResetCache()}> 캐시값 삭제</button>
      {data?.map((item, idx) => {
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
  );
}

export default UserList;
