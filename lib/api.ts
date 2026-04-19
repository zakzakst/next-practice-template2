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

export const withErrorHandler = (
  handler: (...args: any[]) => Promise<NextResponse | Response>,
) => {
  return async (...args: any[]) => {
    try {
      return await handler(...args);
    } catch (error) {
      if (error instanceof ApiError) {
        return NextResponse.json(
          {
            error: {
              code: error.code,
              message: error.message,
            },
          },
          { status: error.statusCode },
        );
      }

      console.error("Unhandled API Error:", error);
      return NextResponse.json(
        {
          error: {
            code: "INTERNAL_SERVER_ERROR",
            message: "サーバーエラーが発生しました",
          },
        },
        { status: 500 },
      );
    }
  };
};
