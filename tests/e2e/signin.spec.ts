import { expect, test } from "@playwright/test";

// TODO: chromium, webkit, firefoxと複数回実行するとメールアドレス重複でエラーになってしまう？
test.fixme("サインイン成功したらトップページに遷移する", async ({ page }) => {
  // Arrange
  await page.goto("http://localhost:3000/signin");
  const emailInput = page.getByRole("textbox", { name: "メールアドレス" });
  const passwordInput = page.getByRole("textbox", { name: "パスワード" });
  const submitButton = page.getByRole("button", { name: "ユーザー登録" });

  // Act
  await emailInput.pressSequentially("new@example.com");
  await passwordInput.pressSequentially("passwordnew");
  await page.keyboard.press("Tab");
  await submitButton.click();

  // Assert
  await expect(page).toHaveURL("http://localhost:3000");
  await expect(page.getByText("名前未設定")).toBeVisible();
});
