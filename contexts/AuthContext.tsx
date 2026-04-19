"use client";

import { useCallback } from "react";
import { createContext, useContext } from "react";

import { useRouter } from "next/navigation";

import { useAuthLogout } from "@/src/orval/auth";
import { Profile, useGetProfile } from "@/src/orval/profile";
import { toast } from "sonner";

type AuthContextType = {
  profile?: Profile | null;
  isLoading: boolean;
  isMutating: boolean;
  profileMutate: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { data: profile, isLoading, mutate } = useGetProfile();
  const { trigger, isMutating } = useAuthLogout();

  // TODO: 調べて修正。SWRから返ってくるmutateの型指定が分からなかったので、一旦useCallbackでラップして回避している
  const profileMutate = useCallback(async () => {
    mutate();
  }, [mutate]);

  // TODO: 調べて修正。ログアウト状態でプロフィール取得するとAPIがエラーレスポンスを返すので不自然な挙動になる（本当はnullを返してprofileを更新したい）
  const logout = useCallback(async () => {
    if (isLoading) return;
    await trigger();
    await mutate();
    toast("ログアウトしました");
    router.push("/login");
  }, [isLoading, trigger, mutate, router]);

  return (
    <AuthContext.Provider
      value={{
        profile: profile?.data || null,
        isLoading,
        isMutating,
        profileMutate,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
