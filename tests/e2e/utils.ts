import { Page } from "@playwright/test";

type TestInfo = {
  page: Page;
  defaultBrowserType?: "chromium" | "firefox" | "webkit";
};

type AuthInput = {
  email: string;
  password: string;
};

export const login = async (
  { page, defaultBrowserType }: TestInfo,
  input: AuthInput,
) => {
  await page.goto("http://localhost:3000/login");
  const emailInput = page.getByRole("textbox", { name: "メールアドレス" });
  const passwordInput = page.getByRole("textbox", { name: "パスワード" });
  const submitButton = page.getByRole("button", { name: "ログイン" });

  if (defaultBrowserType === "webkit") {
    // webkitでfillを利用した場合、値が入力されないエラーがあったため、pressSequentiallyで代替
    await emailInput.pressSequentially(input.email);
    await passwordInput.pressSequentially(input.password);
  } else {
    await emailInput.fill(input.email);
    await passwordInput.fill(input.password);
  }
  await page.keyboard.press("Tab");
  await submitButton.click();
  await page.waitForURL("http://localhost:3000");
};

export const signin = async (
  { page, defaultBrowserType }: TestInfo,
  input: AuthInput,
) => {
  await page.goto("http://localhost:3000/signin");
  const emailInput = page.getByRole("textbox", { name: "メールアドレス" });
  const passwordInput = page.getByRole("textbox", { name: "パスワード" });
  const submitButton = page.getByRole("button", { name: "ユーザー登録" });

  if (defaultBrowserType === "webkit") {
    // webkitでfillを利用した場合、値が入力されないエラーがあったため、pressSequentiallyで代替
    await emailInput.pressSequentially(input.email);
    await passwordInput.pressSequentially(input.password);
  } else {
    await emailInput.fill(input.email);
    await passwordInput.fill(input.password);
  }
  await page.keyboard.press("Tab");
  await submitButton.click();
  await page.waitForURL("http://localhost:3000");
};

export const logout = async (page: Page) => {
  const logoutButton = await page
    .locator('[data-testid="navbar-logout-button"]')
    .first();

  await logoutButton.click();
};
