"use client";
import React, { ReactNode } from "react";
import { useSession } from "next-auth/react";

export default function LoadingPage({ children }: { children: ReactNode }) {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-[#16ab39] animate-bounce [animation-delay:.7s]" />
          <div className="w-4 h-4 rounded-full bg-[#16ab39] animate-bounce [animation-delay:.3s]" />
          <div className="w-4 h-4 rounded-full bg-[#16ab39] animate-bounce [animation-delay:.7s]" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
