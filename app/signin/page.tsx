import type { Metadata } from "next";

import { SigninForm } from "@/components/features/auth/SigninForm";

export const metadata: Metadata = {
  title: "ユーザー登録",
  description: "フォームを入力してユーザー登録してください",
};

const Page = () => {
  return (
    <div className="grid h-full w-full place-items-center">
      <SigninForm />
    </div>
  );
};

export default Page;
