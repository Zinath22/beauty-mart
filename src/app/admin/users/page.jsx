"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 LOAD USERS
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetch("/api/users", {
          cache: "no-store",
        });

        const data = await res.json();

        // ✅ FIXED
        if (data.success) {
          setUsers(data.users || []);
        } else {
          setUsers([]);
        }

      } catch (error) {
        console.log("Fetch users error:", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  // 🔥 MAKE ADMIN
  const makeAdmin = async (id) => {
    try {
      const res = await fetch("/api/make-admin", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire("Success", "User is now admin", "success");

        // 🔥 UPDATE UI
        setUsers((prev) =>
          prev.map((u) =>
            u._id === id
              ? { ...u, role: "admin" }
              : u
          )
        );

      } else {
        Swal.fire(
          "Error",
          data.message || "Failed",
          "error"
        );
      }

    } catch (error) {
      console.log(error);

      Swal.fire(
        "Error",
        "Server error",
        "error"
      );
    }
  };

  // 🔥 DELETE USER
  const deleteUser = async (id) => {
    try {
      const res = await fetch("/api/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire(
          "Deleted",
          "User removed",
          "success"
        );

        // 🔥 REMOVE FROM UI
        setUsers((prev) =>
          prev.filter((u) => u._id !== id)
        );

      } else {
        Swal.fire(
          "Error",
          data.message || "Failed",
          "error"
        );
      }

    } catch (error) {
      console.log(error);

      Swal.fire(
        "Error",
        "Server error",
        "error"
      );
    }
  };

  // 🔥 LOADING
  if (loading) {
    return (
      <p className="p-5">
        Loading users...
      </p>
    );
  }

  return (
    <div className="p-5">

      {/* TITLE */}
      <h1 className="text-2xl font-bold mb-5">
        All Users ({users.length})
      </h1>

      {/* EMPTY */}
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <div className="space-y-3">

          {users.map((user) => (
            <div
              key={user._id}
              className="border p-4 rounded-lg flex justify-between items-center"
            >

              {/* USER INFO */}
              <div>
                <p className="font-semibold">
                  {user.email}
                </p>

                <p className="text-sm text-gray-500">
                  Role: {user.role}
                </p>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-2">

                {/* MAKE ADMIN */}
                {user.role !== "admin" && (
                  <button
                    onClick={() =>
                      makeAdmin(user._id)
                    }
                    className="btn btn-warning btn-sm"
                  >
                    Make Admin
                  </button>
                )}

                {/* DELETE */}
                <button
                  onClick={() =>
                    deleteUser(user._id)
                  }
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}