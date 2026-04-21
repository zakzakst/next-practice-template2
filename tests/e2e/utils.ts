import { API_MOCK_DEFAULT_DELAY, apiDelay } from "@/lib/api";
import { Page } from "@playwright/test";

type LoginInput = {
  email: string;
  password: string;
};

export const login = async (page: Page, input: LoginInput) => {
  await page.goto("http://localhost:3000/login");
  const emailInput = page.getByRole("textbox", { name: "メールアドレス" });
  const passwordInput = page.getByRole("textbox", { name: "パスワード" });
  const submitButton = page.getByRole("button", { name: "ログイン" });

  await emailInput.pressSequentially(input.email);
  await passwordInput.pressSequentially(input.password);
  await page.keyboard.press("Tab");
  await submitButton.click();
  await apiDelay(API_MOCK_DEFAULT_DELAY + 1000);
};

export const logout = async (page: Page) => {
  const logoutButton = page.getByRole("button", { name: "ログアウト" });

  await logoutButton.click();
  await apiDelay(API_MOCK_DEFAULT_DELAY + 1000);
};
