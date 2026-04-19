


// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { signIn } from "next-auth/react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Swal from "sweetalert2";

// export default function LoginPage() {
//   const router = useRouter();
//   const params = useSearchParams();

//   const callback = params.get("callbackUrl") || "/dashboard";

//   const [form, setForm] = useState({
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

//     const result = await signIn("credentials", {
//       email: form.email,
//       password: form.password,
//       redirect: false,
//     });

//     // ❌ login fail
//     if (result?.error) {
//       if (result.error.includes("verify")) {
//         Swal.fire(
//           "Verify Required",
//           "📧 Please verify your email before login",
//           "warning"
//         );
//       } else {
//         Swal.fire(
//           "Error",
//           "Email or Password not matched!",
//           "error"
//         );
//       }
//     }

//     // ✅ login success
//     else if (result?.ok) {
//       await Swal.fire(
//         "Success",
//         "Login Successful",
//         "success"
//       );

//       setForm({
//         email: "",
//         password: "",
//       });

//       router.push(callback);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-base-200">

//       <form
//         autoComplete="off"
//         onSubmit={handleSubmit}
//         className="card p-6 w-96 shadow-xl bg-base-100"
//       >

//         <h2 className="text-xl font-bold mb-4 text-center">
//           Login
//         </h2>

//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           className="input input-bordered mb-3 w-full"
//           value={form.email}
//           onChange={handleChange}
//           autoComplete="off"
//           required
//         />

//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           className="input input-bordered mb-3 w-full"
//           value={form.password}
//           onChange={handleChange}
//           autoComplete="new-password"
//           required
//         />

//         <button className="btn btn-primary w-full">
//           Login
//         </button>

//         <div className="text-center mt-4">
//           <p className="text-sm">Don’t have account?</p>

//           <Link href={`/register?callbackUrl=${callback}`}>
//             <button
//               type="button"
//               className="btn btn-outline btn-sm mt-2"
//             >
//               Register Now
//             </button>
//           </Link>
//         </div>

//       </form>

//     </div>
//   );
// }


"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();

  const callback = params.get("callbackUrl") || "/dashboard";

  const [form, setForm] = useState({
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

    try {
      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      // ❌ LOGIN FAILED
      if (result?.error) {
        const error = result.error.toLowerCase();

        if (error.includes("verify")) {
          Swal.fire(
            "Verify Required",
            "📧 Please verify your email before login",
            "warning"
          );
        } else if (error.includes("user")) {
          Swal.fire("Error", "User not found", "error");
        } else if (error.includes("password")) {
          Swal.fire("Error", "Wrong password", "error");
        } else {
          Swal.fire("Error", result.error, "error");
        }

        return;
      }

      // ✅ LOGIN SUCCESS
      if (result?.ok) {
        await Swal.fire(
          "Success",
          "Login Successful",
          "success"
        );

        setForm({
          email: "",
          password: "",
        });

        router.push(callback);
      }

    } catch (error) {
      console.log("LOGIN ERROR:", error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">

      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="card p-6 w-96 shadow-xl bg-base-100"
      >

        <h2 className="text-xl font-bold mb-4 text-center">
          Login
        </h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input input-bordered mb-3 w-full"
          value={form.email}
          onChange={handleChange}
          autoComplete="off"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input input-bordered mb-3 w-full"
          value={form.password}
          onChange={handleChange}
          autoComplete="new-password"
          required
        />

        <button className="btn btn-primary w-full">
          Login
        </button>

        <div className="text-center mt-4">
          <p className="text-sm">Don’t have account?</p>

          <Link href={`/register?callbackUrl=${callback}`}>
            <button
              type="button"
              className="btn btn-outline btn-sm mt-2"
            >
              Register Now
            </button>
          </Link>
        </div>

      </form>

    </div>
  );
}
