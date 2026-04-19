"use client";

import { useCallback } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthSignin } from "@/orval/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export const signinFormSchema = z.object({
  email: z.email({ error: "有効なメールアドレスを入力してください" }),
  password: z
    .string()
    .min(8, { error: "パスワードは8文字以上で入力してください" }),
});

export type SigninFormValues = z.infer<typeof signinFormSchema>;

export const SigninForm = () => {
  const router = useRouter();
  const { trigger, isMutating } = useAuthSignin();
  const { profileMutate } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<SigninFormValues>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (values: SigninFormValues) => {
      if (isMutating) return;
      await trigger(values);
      await profileMutate();
      toast("ユーザー登録しました");
      router.push("/");
    },
    [isMutating, trigger, profileMutate, router],
  );

  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>ユーザー登録フォーム</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-[max-content_1fr] gap-2">
            <div className="col-span-2 grid grid-cols-subgrid">
              <Label htmlFor="email">メールアドレス</Label>
              <div>
                <Input id="email" {...register("email")} />
                {errors.email && <p>{errors.email.message}</p>}
              </div>
            </div>
            <div className="col-span-2 grid grid-cols-subgrid">
              <Label htmlFor="password">パスワード</Label>
              <div>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && <p>{errors.password.message}</p>}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-2">
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isMutating || !isValid}
          >
            ユーザー登録
          </Button>
          <Button variant="outline" asChild>
            <Link href="/login">ログイン</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
