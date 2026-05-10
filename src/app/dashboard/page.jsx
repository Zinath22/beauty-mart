"use client";

import { useAuth } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (user?.role === "admin") {
      router.push("/admin"); // 🔥 admin redirect
    }
  }, [user, loading]);

  if (loading) return <p>Loading...</p>;

  return <h1>User Dashboard</h1>;
}