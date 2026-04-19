import { NextResponse } from "next/server";

import { users } from "@/dummy-db/user";
import { ApiError, apiDelay, withErrorHandler } from "@/lib/api";
import { getJwtPayload } from "@/lib/jwt";
import { GetProfile200 } from "@/orval/profile";

export const GET = withErrorHandler(
  async (): Promise<NextResponse<GetProfile200>> => {
    await apiDelay();

    // === 認証状態の確認 ===
    const jwtPayload = await getJwtPayload();
    if (!jwtPayload) {
      // 未ログインの場合、空のプロフィール情報を返す
      return NextResponse.json({});
    }

    // === ユーザー情報の確認 ===
    const user = users.find((u) => u.id === jwtPayload?.id);
    if (!user) {
      throw new ApiError(404, "対応するユーザーが見つかりません", "NOT_FOUND");
    }

    return NextResponse.json({ profile: user });
  },
);
