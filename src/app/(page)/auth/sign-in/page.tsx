"use client";

import React, { FormEvent, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useCreateAccesstoken } from "@/lib/react-query/hooks";
import { useGetUserInfo } from "@/lib/react-query/hooks/user";
import toast from "react-hot-toast";
import crypto from "crypto";

interface Props {}

function Page(props: Props) {
  const router = useRouter();

  const { data, isLoading } = useGetUserInfo({
    // retry: true,
  });

  const { mutate, isPending } = useCreateAccesstoken({
    onSuccess: (data) => {
      Cookies.set("token", data.token);
      router.push("/user-info");
    },
    onError: (e) => {
      console.log(e);
      toast.error(e.message);
    },
  });

  useEffect(() => {
    if (data) router.replace("/");
  }, [data]);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  if (isLoading) {
    return <></>;
  }
  if (data) {
    return <></>;
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email?.length || !password?.length) {
      alert("둘중 하나라도 입력안하면뜬다");
      return;
    }
    // Sha1 password convert
    // const hashPassword = crypto.createHash("sha1").update(password).digest("hex");

    mutate({
      username: email,
      password: password,
    });
  };

  return (
    <div className="container">
      <div className="top-logo">top-logo</div>
      <form className="form" onSubmit={handleSubmit}>
        <p>Welcome, ep:stay</p>
        userName
        <input type="text" ref={emailRef} defaultValue={"emilys"} />
        password
        <input
          autoComplete="on"
          // type="password"
          ref={passwordRef}
          defaultValue={"emilyspass"}
        />
        <button type="submit">{isPending ? "로딩중" : "로그인"}</button>
      </form>

      <div className="bottom-logo">bottom-logo</div>
    </div>
  );
}

export default Page;
