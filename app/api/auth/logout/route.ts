import { NextResponse } from "next/server";

import { apiDelay, withErrorHandler } from "@/lib/api";
import { AuthLogout200 } from "@/src/orval/auth";

export const POST = withErrorHandler(
  async (): Promise<NextResponse<AuthLogout200>> => {
    await apiDelay();

    // === レスポンス作成 ===
    const response = NextResponse.json({
      message: "ログアウト成功",
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      path: "/",
      maxAge: 0,
    });

    return response;
  },
);
