

// // import NextAuth from "next-auth";
// // import CredentialsProvider from "next-auth/providers/credentials";
// // import { dbConnect } from "@/lib/dbConnect";
// // import bcrypt from "bcryptjs";

// // const handler = NextAuth({
// //   providers: [
// //     CredentialsProvider({
// //       name: "Credentials",

// //       credentials: {
// //         email: { label: "Email", type: "text" },
// //         password: { label: "Password", type: "password" },
// //       },

// //       async authorize(credentials) {
// //         if (!credentials?.email || !credentials?.password) {
// //           throw new Error("Missing credentials");
// //         }

        

// //         const db = await dbConnect();

// //         const user = await db.collection("users").findOne({
// //           email: credentials.email,
// //         });

// //         if (!user) {
// //           throw new Error("User not found");
// //         }

// //         const isValid = await bcrypt.compare(
// //           credentials.password,
// //           user.password
// //         );

// //         if (!isValid) {
// //           throw new Error("Invalid password");
// //         }

// //         if (!user.verified) {
// //           throw new Error("Please verify your email first");
// //         }

// //         return {
// //           id: user._id.toString(),
// //           name: user.name,
// //           email: user.email,
// //           role: user.role,
// //         };
// //       },
// //     }),
// //   ],

// //   session: {
// //     strategy: "jwt",
// //   },

// //   pages: {
// //     signIn: "/login",
// //   },

// //   secret: process.env.NEXTAUTH_SECRET,
// // });

// // export { handler as GET, handler as POST };


// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { dbConnect } from "@/lib/dbConnect";
// import bcrypt from "bcryptjs";

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",

//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },

//       async authorize(credentials) {
//         try {
//           // validation
//           if (!credentials?.email || !credentials?.password) {
//             throw new Error("Missing credentials");
//           }

//           const db = await dbConnect();

//           const user = await db.collection("users").findOne({
//             email: credentials.email,
//           });

//           if (!user) {
//             throw new Error("User not found");
//           }

//           const isValid = await bcrypt.compare(
//             credentials.password,
//             user.password
//           );

//           if (!isValid) {
//             throw new Error("Invalid password");
//           }

//           // 🔐 email verification check
//           if (!user.verified) {
//             throw new Error("Please verify your email first");
//           }

//           return {
//             id: user._id.toString(),
//             name: user.name,
//             email: user.email,
//             role: user.role || "user",
//           };

//         } catch (error) {
//           console.log("❌ AUTH ERROR:", error.message);

//           // 👉 IMPORTANT: NextAuth proper error throw
//           throw new Error(error.message);
//         }
//       },
//     }),
//   ],

//   session: {
//     strategy: "jwt",
//   },

//   callbacks: {
//     // 🔥 JWT callback (token store)
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//       }

//       return token;
//     },

//     // 🔥 Session callback (frontend data)
//     async session({ session, token }) {
//       if (session?.user) {
//         session.user.id = token.id;
//         session.user.role = token.role;
//       }

//       return session;
//     },
//   },

//   pages: {
//     signIn: "/login",
//   },

//   // 🔥 DEBUG OPTION (VERY USEFUL)
//   debug: process.env.NODE_ENV === "development",

//   secret: process.env.NEXTAUTH_SECRET,
// });

// export { handler as GET, handler as POST };