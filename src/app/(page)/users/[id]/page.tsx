"use client";

import { useGetUser } from "@/lib/react-query/hooks/user/useGetUser";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

function Page(props: Props) {
  const {
    params: { id },
  } = props;

  const { data, isLoading } = useGetUser(id ?? "");

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h1>hello {data?.firstName}</h1>
      <img src={data?.image} alt="이미지" />
      <p>{data?.email}</p>
      <p>{data?.eyeColor}</p>
      <p>{data?.gender}</p>
      <p>{data?.role}</p>
    </div>
  );
}

export default Page;
