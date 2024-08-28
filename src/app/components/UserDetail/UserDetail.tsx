"use client";

import React from "react";

import { getUser } from "@/api/queries";
import Image from "next/image";
import Link from "next/link";

interface Props {
  id: string;
}

function UserDetail(props: Props) {
  const { id } = props;

  const { data, isLoading, error } = getUser(id);

  if (error) {
    return <>{error}</>;
  }
  if (data)
    return (
      <div>
        userId:{id}
        <Image
          src={data?.avatar_url}
          alt={data.id.toString()}
          width={500}
          height={500}
          unoptimized={true}
        />
        <Link href={"/user"}>뒤로</Link>
      </div>
    );
}

export default UserDetail;
