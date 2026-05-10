"use client";

import Link from "next/link";
import { useAuth } from "@/provider/AuthProvider";

export default function AdminLayout({ children }) {
  const { user } = useAuth();

  // 🔐 protect admin
  if (user?.role !== "admin") {
    return <p className="p-5 text-red-500">Access Denied</p>;
  }

  return (
    <div className="flex min-h-screen">

      {/* 🔥 SIDEBAR */}
      <div className="w-64 bg-base-200 p-4">
        <h2 className="text-xl font-bold mb-4">
          ⚙️ Admin Panel
        </h2>

        <ul className="space-y-2">
          <li>
            <Link href="/admin/users" className="btn btn-sm w-full">
              👤 All Users
            </Link>
          </li>

          <li>
            <Link href="/admin/products" className="btn btn-sm w-full">
              📦 Manage Products
            </Link>
          </li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-5">
        {children}
      </div>
    </div>
  );
}