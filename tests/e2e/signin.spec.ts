import { logout, signin } from "./utils";
import { expect, test } from "@playwright/test";

test("サインイン成功したらトップページに遷移する", async ({
  page,
  defaultBrowserType,
}) => {
  // Arrange
  await signin(
    { page, defaultBrowserType },
    {
      // NOTE: 日付と利用ブラウザをアドレス名に含めることで、アドレス重複エラーを回避
      email: `${Date.now()}${defaultBrowserType}@example.com`,
      password: "passwordnew",
    },
  );

  // Assert
  await expect(page).toHaveURL("http://localhost:3000");
  await expect(page.getByText("名前未設定")).toBeVisible();

  await logout(page);
});
