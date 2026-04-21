import { login, logout } from "./utils";
import { expect, test } from "@playwright/test";

// TODO: 調べて修正。locatorとか「要素が表示されるまで待つ」系のメソッド使ってapiDelayで書いているところを修正したい
test("ログイン成功したらトップページに遷移する", async ({ page }) => {
  // Arrange
  login(page, { email: "taro@example.com", password: "password123" });

  // Assert
  await expect(page).toHaveURL("http://localhost:3000");
  await expect(page.getByText("Taro Yamada")).toBeVisible();

  logout(page);
});
