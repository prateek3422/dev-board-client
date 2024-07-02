"use client";
import { useAuthStore } from "@/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const auth = useAuthStore((state) => state.auth);

  useEffect(() => {
    if (auth.isAuth) router.push("/");
  }, [auth, router]);

  return <>{children}</>;
}

export function DashWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const auth = useAuthStore((state) => state.auth);

  useEffect(() => {
    if (!auth.isAuth) router.push("/auth/signin");
  }, [auth, router]);

  return <>{children}</>;
}
