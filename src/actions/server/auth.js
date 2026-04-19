// "use server";

// import { collections, dbConnect } from "@/lib/dbConnect";
// import bcrypt from "bcryptjs";

// // REGISTER
// export const postUser = async (payload) => {
//   const { email, password, name } = payload;

//   if (!email || !password) {
//     return { success: false, message: "Missing fields" };
//   }

//   // ✅ FIX: get db first
//   const db = await dbConnect();
//   const users = db.collection(collections.USERS);

//   const exist = await users.findOne({ email });

//   if (exist) {
//     return { success: false, message: "User already exists" };
//   }

//   const hashed = await bcrypt.hash(password, 10);

//   await users.insertOne({
//     name,
//     email,
//     password: hashed,
//     role: "user",
//     createdAt: new Date(),
//   });

//   return { success: true };
// };


// // LOGIN
// export const loginUser = async ({ email, password }) => {
//   if (!email || !password) {
//     return { success: false, message: "Missing fields" };
//   }

//   // ✅ FIX: get db first
//   const db = await dbConnect();
//   const users = db.collection(collections.USERS);

//   const user = await users.findOne({ email });

//   if (!user) {
//     return { success: false, message: "User not found" };
//   }

//   const ok = await bcrypt.compare(password, user.password);

//   if (!ok) {
//     return { success: false, message: "Wrong password" };
//   }

//   // remove password
//   const { password: _, ...safeUser } = user;

//   return { success: true, user: safeUser };
// };


"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const postUser = async (payload) => {
  try {
    const { email, password, name } = payload;

    if (!email || !password || !name) {
      return { success: false, message: "Missing fields" };
    }

    const db = await dbConnect();
    const users = db.collection(collections.USERS);

    const exist = await users.findOne({ email });
    if (exist) {
      return { success: false, message: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verifyToken = crypto.randomBytes(32).toString("hex");

    await users.insertOne({
      name,
      email,
      password: hashedPassword,
      role: "user",
      verified: false,
      verifyToken,
      createdAt: new Date(),
    });

    // 🔗 verification link
    const verifyLink = `${process.env.NEXTAUTH_URL}/verify?token=${verifyToken}`;

    // 📧 send email via Resend
    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verify your email",
      html: `
        <h2>Verify Your Account</h2>
        <p>Click below:</p>
        <a href="${verifyLink}">Verify Email</a>
      `,
    });

    if (error) {
      console.log("❌ EMAIL ERROR:", error);
      return { success: false, message: "Email failed" };
    }

    console.log("✅ EMAIL SENT");

    return { success: true };

  } catch (err) {
    console.log("❌ REGISTER ERROR:", err);
    return { success: false, message: err.message };
    
  }
};