"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

interface Props {}

function Page(props: Props) {
  const {} = props;

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/api/map");
      //   const result = await data.json();
      const res = await data.json();
      console.log(data);

      //   let XmlNode = new DOMParser().parseFromString(res, "text/xml");

      //   console.log(XmlNode);
    };
    fetchData();
  }, []);

  return <div>hello</div>;
}

export default Page;
