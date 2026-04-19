import { NextRequest, NextResponse } from "next/server";

import { auths } from "@/dummy-db/auth";
import { users } from "@/dummy-db/user";
import { ApiError, apiDelay, withErrorHandler } from "@/lib/api";
import { signToken } from "@/lib/jwt";
import { AuthLogin200, AuthLoginBody } from "@/orval/auth";

export const POST = withErrorHandler(
  async (request: NextRequest): Promise<NextResponse<AuthLogin200>> => {
    await apiDelay();

    const { email, password }: AuthLoginBody = await request.json();

    // === 認証情報の確認 ===
    const auth = auths.find(
      (a) => a.email === email && a.password === password,
    );
    if (!auth) {
      throw new ApiError(
        401,
        "メールアドレスまたはパスワードが違います",
        "UNAUTHORIZED",
      );
    }

    // === ユーザー情報の確認 ===
    const user = users.find((u) => u.email === email);
    if (!user) {
      throw new ApiError(404, "対応するユーザーが見つかりません", "NOT_FOUND");
    }

    // === レスポンス作成 ===
    const response = NextResponse.json({
      message: "ログイン成功",
    });

    const token = signToken({
      id: user.id,
      roles: user.roles,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
    });

    return response;
  },
);
