


// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { postUser } from "@/actions/server/auth";
// import { useRouter } from "next/navigation";
// import Swal from "sweetalert2";

// export default function RegisterPage() {
//   const router = useRouter();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

  

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // validation
//     if (form.password.length < 6) {
//       return Swal.fire(
//         "Error",
//         "Password must be at least 6 characters",
//         "error"
//       );
//     }

//     const res = await postUser(form);

//     if (res?.success) {
//       // ✅ email verify message
//       await Swal.fire({
//         icon: "success",
//         title: "Registration Successful 🎉",
//         html: "📧 Check your email and verify your account before login.",
//         confirmButtonText: "Go to Login",
//       });

//       // clear form
//       setForm({
//         name: "",
//         email: "",
//         password: "",
//       });

//       router.push("/login");
//     } else {
//       Swal.fire(
//         "Error",
//         res?.message || "Registration failed",
//         "error"
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-base-200">

//       <div className="card w-full max-w-sm shadow-xl bg-base-100">
//         <div className="card-body">

//           <h2 className="text-2xl font-bold text-center">
//             Create Account
//           </h2>

//           <form autoComplete="off" onSubmit={handleSubmit} className="space-y-3">

//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               className="input input-bordered w-full"
//               value={form.name}
//               onChange={handleChange}
//               required
//             />

//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               className="input input-bordered w-full"
//               value={form.email}
//               onChange={handleChange}
//               autoComplete="off"
//               required
//             />

//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               className="input input-bordered w-full"
//               value={form.password}
//               onChange={handleChange}
//               autoComplete="new-password"
//               required
//             />

//             <button type="submit" className="btn btn-primary w-full">
//               Register
//             </button>

//           </form>

//           <p className="text-center text-sm mt-4">
//             Already have an account?{" "}
//             <Link href="/login" className="link link-primary">
//               Login
//             </Link>
//           </p>

//         </div>
//       </div>

//     </div>
//   );
// }



"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔐 validation
    if (form.password.length < 6) {
      return Swal.fire(
        "Error",
        "Password must be at least 6 characters",
        "error"
      );
    }

    try {
      setLoading(true);

      // 🔥 API CALL (IMPORTANT FIX)
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        await Swal.fire({
          icon: "success",
          title: "Registration Successful 🎉",
          html: "📧 Check your email and verify your account before login.",
          confirmButtonText: "Go to Login",
        });

        // reset form
        setForm({
          name: "",
          email: "",
          password: "",
        });

        router.push("/login");

      } else {
        Swal.fire("Error", data.message || "Registration failed", "error");
      }

    } catch (error) {
      console.log("REGISTER ERROR:", error);
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">

      <div className="card w-full max-w-sm shadow-xl bg-base-100">
        <div className="card-body">

          <h2 className="text-2xl font-bold text-center">
            Create Account
          </h2>

          <form  onSubmit={handleSubmit} className="space-y-3">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="input input-bordered w-full"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Creating..." : "Register"}
            </button>

          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/login" className="link link-primary">
              Login
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}