import Cookies from "js-cookie";
import { redirect, RedirectType } from "next/navigation";

export async function fetcher(url: string, init?: RequestInit) {
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await fetch(`${baseURL}${url}`, {
    headers: {
      Authorization: Cookies.get("token") ?? "",
      ...init?.headers,
    },
    ...init,
  });

  if (!response.ok) {
    throw new Error("Network response was not ok", {
      cause: {
        code: response.status,
      },
    });
  }

  return response;
}
