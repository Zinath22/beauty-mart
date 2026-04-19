"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("user");

    if (!data) {
      router.push("/login");
    } else {
      setUser(JSON.parse(data));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">
        Welcome {user?.name}
      </h1>

      <p>{user?.email}</p>

      <button onClick={logout} className="btn btn-error mt-4">
        Logout
      </button>
    </div>
  );
}