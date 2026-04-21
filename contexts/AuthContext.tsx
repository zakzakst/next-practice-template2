"use client";

import { useCallback } from "react";
import { createContext, useContext } from "react";

import { useRouter } from "next/navigation";

import { AuthMe, useAuthLogout, useAuthMe } from "@/orval/auth";
import { toast } from "sonner";

type AuthContextType = {
  me?: AuthMe;
  isLoading: boolean;
  isMutating: boolean;
  mutate: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { data, isLoading, mutate } = useAuthMe();
  const { trigger, isMutating } = useAuthLogout();

  // TODO: 調べて修正。SWRから返ってくるmutateの型指定が分からなかったので、一旦useCallbackでラップして回避している
  const meMutate = useCallback(async () => {
    mutate();
  }, [mutate]);

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
        me: data?.data?.me,
        isLoading,
        isMutating,
        mutate: meMutate,
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
