import Cookies from "js-cookie";

// 자격증명 및 메소드
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
    throw new Error("Network response was not ok");
  }

  return response;
}
