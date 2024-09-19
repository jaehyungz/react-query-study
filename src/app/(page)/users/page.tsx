"use client";

import { useGetUsers } from "@/lib/react-query/hooks";
import React, { useState } from "react";

import "./style.css";
import { useRouter } from "next/navigation";
import { useCreateUser } from "@/lib/react-query/hooks/user/useCreateUser";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib";

interface Props {}

function Page(props: Props) {
  const router = useRouter();

  const client = useQueryClient();

  const [skip, setSkip] = useState(0);

  const { data } = useGetUsers(skip.toString());

  const { mutate } = useCreateUser({
    onSuccess: (data) => {
      client.invalidateQueries(queryKeys.user.list(skip.toString()));
      toast.success("성공!");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error);
    },
  });

  const handleClick = (id: number) => () => {
    router.push(`/users/${id}`);
  };
  const handleCreate = () => {
    mutate({
      firstName: "choi",
      lastName: "jaehyung",
      age: 28,
    });
  };

  return (
    <>
      <div className="buttons">
        <button onClick={handleCreate}>NEW</button>
      </div>
      <div className="pagination">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
          return (
            <span
              key={item}
              onClick={() => setSkip(item)}
              className={skip === item ? "active" : ""}
            >
              {item + 1}
            </span>
          );
        })}
      </div>
      <div className="user-list">
        {data?.users.map((item) => {
          return (
            <div key={item.id}>
              <img src={item.image} alt="이미지" width={50} height={50} />
              <div>
                <span>{item.email}</span>
                <span>{item.gender}</span>
              </div>

              <button type="button" onClick={handleClick(item.id)}>
                상세
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Page;
