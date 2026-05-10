"use client";

import { useEffect, useState } from "react";

export default function AdminCarts() {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/cart");
      const data = await res.json();
      setCarts(data);
    };

    load();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold">🛒 All User Carts</h1>

      {carts.map((c, i) => (
        <div key={i} className="border p-3 mt-3">
          <h2>User: {c.userEmail}</h2>

          {c.items.map((item, j) => (
            <div key={j} className="ml-4">
              <p>{item.title} - ৳{item.price}</p>
              <p>Status: {item.status}</p>

              <button className="btn btn-success btn-sm">
                Approve
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}