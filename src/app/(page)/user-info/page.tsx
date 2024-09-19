"use client";
import { useGetUserInfo } from "@/lib/react-query/hooks/user/useGetUserInfo";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { queryKeys } from "@/lib";
import Link from "next/link";

interface Props {}

function Page(props: Props) {
  const router = useRouter();
  const client = useQueryClient();

  const { data, isError, error, isLoading } = useGetUserInfo({
    // retry: true,
  });

  const handleClearCache = () => {
    if (Cookies.get("token")) {
      Cookies.remove("token");

      client.invalidateQueries({
        queryKey: queryKeys.user.info()["queryKey"],
      });
    }
  };

  if (isLoading) {
    return <></>;
  }

  if (error) {
    console.log(error);
    // return <>error 발생~</>;
  }

  return (
    <div>
      <h1>마이페이지</h1>
      <h3>hello {data?.username}</h3>

      <Link href="/users">유저목록 보기</Link>
      {/* <button onClick={handleClearCache}>clear Cache</button> */}
    </div>
  );
}

export default Page;
