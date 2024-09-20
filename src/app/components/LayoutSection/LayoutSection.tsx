"use client";

import React, { useEffect } from "react";

import "./style.css";
import Link from "next/link";
import Cookies from "js-cookie";
import { queryKeys } from "@/lib";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useGetUserInfo } from "@/lib/react-query/hooks/user";

interface Props {
  children: React.ReactNode;
}

const paths = [
  {
    label: "맵",
    value: "/map",
  },
  {
    label: "스티키",
    value: "/sticky",
  },
  {
    label: "유저정보",
    value: "/user-info",
  },
  {
    label: "캘린더",
    value: "/calendar",
  },
  {
    label: "차트",
    value: "/chart",
  },
];

function LayoutSection({ children }: Props) {
  //   const {} = props;

  const router = useRouter();

  const client = useQueryClient();

  const { data } = useGetUserInfo({
    // retry: true,
    refetchOnWindowFocus: true,
  });

  const handleAuth = () => {
    if (data) {
      //로그아웃
      Cookies.remove("token");

      client.resetQueries({
        queryKey: queryKeys.user.info()["queryKey"],
      });

      //   client.invalidateQueries({
      //     queryKey: queryKeys.user.info()["queryKey"],
      //   });

      router.replace("/auth/sign-in");
    } else {
      router.push("/auth/sign-in");
    }
  };

  return (
    <div className="body">
      <section className="header">
        <div className="menu">
          {paths.map((item) => {
            return (
              <Link href={item.value} key={item.value}>
                {item.label}
              </Link>
            );
          })}
        </div>

        <button type="button" onClick={handleAuth}>
          {data ? "로그아웃" : "로그인"}
        </button>
      </section>
      <section className="content">{children}</section>
    </div>
  );
}

export default LayoutSection;
