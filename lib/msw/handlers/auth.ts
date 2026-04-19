import { users } from "@/dummy-db/user";
import { API_MOCK_DEFAULT_DELAY } from "@/lib/api";
import { HttpResponse, delay, http } from "msw";

export const authMeHandler = http.get("*/auth/me", async () => {
  await delay(API_MOCK_DEFAULT_DELAY);
  return new HttpResponse(
    JSON.stringify({ ...users[1], password: undefined }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
});

export const authHandlers = [authMeHandler];
