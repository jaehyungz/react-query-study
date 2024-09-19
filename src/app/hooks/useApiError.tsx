"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface IErrorCode {
  default: (httpMessage?: string) => void;
  401: () => void;
  403: () => void;
  409: () => void;
  500: () => void;
}

function useApiError() {
  const router = useRouter();

  const handleError = (error: Error) => {
    const status = (error.cause as { code?: "default" | 401 | 403 | 409 | 500 })
      ?.code;

    const defaultHandler = (httpMessage?: string) => {
      toast.error(httpMessage ? httpMessage : "Network response was not ok");
    };

    const handler401 = () => {
      router.replace("/auth/sign-in");
      toast.error("토큰만료");
    };

    const handler403 = () => {
      router.replace("/auth/sign-in");
      toast.error("토큰만료");
    };

    const handler409 = () => {
      toast.error("409 Error");
    };

    const handler500 = () => {
      toast.error("서버에서 알 수 없는 문제가 발생하였습니다.");
    };

    const handlers: IErrorCode = {
      default: defaultHandler,
      401: handler401,
      403: handler403,
      409: handler409,
      500: handler500,
    };

    if (status && handlers[status]) {
      return handlers[status]();
    }
    handlers.default(error.message);
  };

  return { handleError };
}

export default useApiError;
