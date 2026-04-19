import { NextResponse } from "next/server";

import { users } from "@/dummy-db/user";
import { ApiError, apiDelay, withErrorHandler } from "@/lib/api";
import { getJwtPayload } from "@/lib/jwt";
import { Profile } from "@/src/orval/profile";

export const GET = withErrorHandler(
  async (): Promise<NextResponse<Profile>> => {
    await apiDelay();

    // === 認証状態の確認 ===
    const jwtPayload = await getJwtPayload();
    if (!jwtPayload) {
      // TODO: 調べる。ログインしていない場合nullを返したいが、openapiの書き方分からない。一旦保留
      throw new ApiError(
        401,
        "メールアドレスまたはパスワードが違います",
        "UNAUTHORIZED",
      );
    }

    // === ユーザー情報の確認 ===
    const user = users.find((u) => u.id === jwtPayload?.id);
    if (!user) {
      throw new ApiError(404, "対応するユーザーが見つかりません", "NOT_FOUND");
    }

    return NextResponse.json(user);
  },
);
