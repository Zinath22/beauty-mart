
"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function VerifyEmail() {
  const params = useSearchParams();

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
    }
  }, []);

  return <h2>Verifying your email...</h2>;
}