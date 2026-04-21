import { NextResponse } from "next/server";

import { auths } from "@/dummy-db/auth";
import { users } from "@/dummy-db/user";
import { ApiError, apiDelay, withErrorHandler } from "@/lib/api";
import { getJwtPayload } from "@/lib/jwt";
import { AuthMe200 } from "@/orval/auth";

export const GET = withErrorHandler(
  async (): Promise<NextResponse<AuthMe200>> => {
    await apiDelay();

    // === 認証状態の確認 ===
    const jwtPayload = await getJwtPayload();
    if (!jwtPayload) {
      // 未ログインの場合、空のプロフィール情報を返す
      return NextResponse.json({});
    }

    // === ユーザー情報の確認 ===
    const auth = auths.find((a) => a.id === jwtPayload.id);
    const user = users.find((u) => u.email === auth?.email);
    if (!auth || !user) {
      throw new ApiError(404, "対応するユーザーが見つかりません", "NOT_FOUND");
    }

    return NextResponse.json({
      me: {
        id: user.id,
        name: user.name,
        roles: auth.roles,
        lastLoginAt: auth.lastLoginAt,
      },
    });
  },
);
