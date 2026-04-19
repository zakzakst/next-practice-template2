import { NextResponse } from "next/server";

export const getApiPath = (path: string) => {
  // TODO: 環境変数でURLの出し分け処理
  return `http://localhost:3000/api${path}`;
};

export const API_MOCK_DEFAULT_DELAY = 1000;

export const apiDelay = (
  delay: number = API_MOCK_DEFAULT_DELAY,
): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code: string = "API_ERROR",
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export type ErrorResponseBody = {
  code: string;
  message: string;
};

export const withErrorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: (...args: any[]) => Promise<NextResponse | Response>,
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (...args: any[]) => {
    try {
      return await handler(...args);
    } catch (error) {
      if (error instanceof ApiError) {
        const responseBody: ErrorResponseBody = {
          code: error.code,
          message: error.message,
        };
        return NextResponse.json(responseBody, { status: error.statusCode });
      }

      console.error("Unhandled API Error:", error);
      const unhandledResponseBody: ErrorResponseBody = {
        code: "INTERNAL_SERVER_ERROR",
        message: "サーバーエラーが発生しました",
      };
      return NextResponse.json(unhandledResponseBody, { status: 500 });
    }
  };
};
