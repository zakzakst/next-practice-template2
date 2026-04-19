"use client";

import { ReactNode } from "react";

import { toast } from "sonner";
import { SWRConfig } from "swr";

export const SWRProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SWRConfig
      value={{
        onError: (error) => {
          const message = error.response.data?.message;
          toast.error(message || "エラーが発生しました");
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};
