"use client";
import { useGetUserInfo } from "@/lib/react-query/hooks/auth/useGetUserInfo";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface Props {}

function Page(props: Props) {
  const router = useRouter();
  const client = useQueryClient();

  const { data, isError } = useGetUserInfo({
    gcTime: 0,
  });

  const handleClearCache = () => {
    if (Cookies.get("token")) {
      Cookies.remove("token");

      client.invalidateQueries({
        queryKey: ["getUserInfo"],
      });
    }
  };

  useEffect(() => {
    if (isError) {
      console.log("왜들어오는거임?");
      // router.replace("/error");
      throw Error("error 페이지로");
    }
  }, [isError]);

  // if (isError) {
  //   return <>error 발생~</>;
  // }

  return (
    <div>
      hello {data?.username}
      <button onClick={handleClearCache}>clear Cache</button>
    </div>
  );
}

export default Page;
