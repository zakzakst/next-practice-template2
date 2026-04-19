import { expect, test } from "@playwright/test";

test("ログイン成功したらトップページに遷移する", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  const emailInput = page.getByRole("textbox", { name: "メールアドレス" });
  const passwordInput = page.getByRole("textbox", { name: "パスワード" });
  const submitButton = page.getByRole("button", { name: "ログイン" });

  // NOTE: 基本的には「fill」を利用したほうがいいとのことだが、webkitのテストの際にバリデーション判定でボタンが無効のままだったので、「pressSequentially」を利用
  // https://playwright.dev/docs/input#type-characters
  await emailInput.pressSequentially("taro@example.com");
  await passwordInput.pressSequentially("password123");
  await submitButton.click();

  // ※webkit以外は下記でもテスト成功した
  // await emailInput.fill("taro@example.com");
  // await passwordInput.fill("password123");
  // await page.keyboard.press("Tab");
  // await submitButton.click();

  await expect(page).toHaveURL("http://localhost:3000");
});
