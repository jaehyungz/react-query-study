// 자격증명 및 메소드
export async function fetcher(url: string, init: RequestInit) {
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await fetch(`${baseURL}${url}`, { ...init });

  return response;
}
