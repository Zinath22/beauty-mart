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

//     try {
//       const result = await signIn("credentials", {
//         email: form.email,
//         password: form.password,
//         redirect: false,
//       });

//       // ❌ LOGIN FAILED
//       if (result?.error) {
//         const error = result.error.toLowerCase();

//         if (error.includes("verify")) {
//           Swal.fire(
//             "Verify Required",
//             "📧 Please verify your email before login",
//             "warning"
//           );
//         } else if (error.includes("user")) {
//           Swal.fire("Error", "User not found", "error");
//         } else if (error.includes("password")) {
//           Swal.fire("Error", "Wrong password", "error");
//         } else {
//           Swal.fire("Error", result.error, "error");
//         }

//         return;
//       }

//       // ✅ LOGIN SUCCESS
//       if (result?.ok) {
//         await Swal.fire(
//           "Success",
//           "Login Successful",
//           "success"
//         );

//         setForm({
//           email: "",
//           password: "",
//         });

//         router.push(callback);
//       }

//     } catch (error) {
//       console.log("LOGIN ERROR:", error);
//       Swal.fire("Error", "Something went wrong", "error");
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
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";

import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();

  const callback = params.get("callbackUrl") || "/dashboard";

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const user = res.user;

      // ❗ Email verification check
      if (!user.emailVerified) {
        await Swal.fire(
          "Verify Required",
          "📧 Please verify your email before login",
          "warning"
        );

        await auth.signOut(); // 🔥 IMPORTANT FIX (force logout)

        return;
      }

      await Swal.fire("Success", "Login Successful", "success");

      setForm({ email: "", password: "" });

      router.push(callback);

    } catch (error) {
      console.log("LOGIN ERROR:", error.code);

      let message = "Something went wrong";

     

          

if (error.code === "auth/user-not-found") {
  message = "User not found";
} 
else if (
  error.code === "auth/wrong-password" ||
  error.code === "auth/invalid-credential"
) {
  message = "Invalid email or password";
} 
else if (error.code === "auth/invalid-email") {
  message = "Invalid email";
}

      // if (
      //   error.code === "auth/user-not-found" ||
      //   error.code === "auth/invalid-credential"
      // ) {
      //   message = "Invalid email or password";
      // } else if (error.code === "auth/invalid-email") {
      //   message = "Invalid email";
      // }

      // if (error.code === "auth/user-not-found") 
      //   { message = "User not found"; } 
      // else if (error.code === "auth/wrong-password") 
      //   { message = "Wrong password"; } else if (error.code === "auth/invalid-email") 
      //     { message = "Invalid email"; }

      Swal.fire("Error", message, "error");
    } finally {
      setLoading(false);
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

        <button
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="text-center mt-4">
          <p className="text-sm">Don’t have account?</p>

          <Link href={`/register?callbackUrl=${callback}`}>
            <button type="button" className="btn btn-outline btn-sm mt-2">
              Register Now
            </button>
          </Link>
        </div>

      </form>

    </div>
  );
}