
// 


"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyPage() {
  const params = useSearchParams();
  const router = useRouter();

  const token = params.get("token");

  useEffect(() => {
    if (!token) return;

    const verifyEmail = async () => {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Email Verified ✔");
        router.push("/login");
      } else {
        alert(data.message || "Invalid link");
      }
    };

    verifyEmail();
  }, [token]);

  return <p>Verifying...</p>;
}