import { NextRequest, NextResponse } from "next/server";
import https from "https";

import fetch from "node-fetch";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("query");
  console.log(query);

  const agent = new https.Agent({
    rejectUnauthorized: false,
  });
  console.log(request.body);
  // console.log(encodeURIComponent(query));

  // const params = new URLSearchParams({
  //   query: "분당구",
  // });
  if (!query) {
    return NextResponse.json(
      { error: "Missing query or coordinate" },
      { status: 400 }
    );
  }

  const response = await fetch(
    `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(
      // "분당구"
      query
    )}`,
    {
      method: "GET",
      agent: agent as any, // Node.js의 https.Agent를 사용

      headers: {
        Accept: "application/json",
        "X-NCP-APIGW-API-KEY-ID": "anqpnd87sh",
        "X-NCP-APIGW-API-KEY": "Xulyxi8EWoMk63Us3ntRrHEgHxvGW5OGKlVgeBMt",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  //   const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const result = await response.json();
  console.log({ result });

  return NextResponse.json(result);
}
