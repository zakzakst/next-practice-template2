import { login, logout } from "./utils";
import { expect, test } from "@playwright/test";

test("ログイン成功したらトップページに遷移する", async ({
  page,
  defaultBrowserType,
}) => {
  // Arrange
  await login(
    { page, defaultBrowserType },
    {
      email: "taro@example.com",
      password: "password123",
    },
  );

  // Assert
  await expect(page).toHaveURL("http://localhost:3000");
  await expect(page.getByText("Taro Yamada")).toBeVisible();

  await logout(page);
});
