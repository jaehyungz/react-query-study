"use client";
import { cookies } from "next/headers";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { createAccessToken } from "@/api/queries/auth/queries";
import { queryKeys } from "@/api/key-factory";
import { useCreateAccesstoken } from "@/lib/react-query/hooks";
import toast from "react-hot-toast";

// import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();

  const { mutate, isPending } = useCreateAccesstoken({
    onSuccess: (data) => {
      console.log("감지해저");
      Cookies.set("token", data.token);
      router.push("/user-info");
    },
    onError: (e) => {
      console.log(e);
      // toast.error(e.message);
    },
  });

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // e.stopPropagation();
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email?.length || !password?.length) {
      alert("둘중 하나라도 입력안하면뜬다");
      return;
    }

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
