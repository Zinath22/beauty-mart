import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev", // ✅ safe default
      to: "email", // ✅ তোমার verified email
      subject: "hello",
      html: "<h1>hello from next</h1>",
    });

    console.log("EMAIL RESPONSE:", data);

    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.log("EMAIL ERROR:", error);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { email } = body;

//     if (!email) {
//       return NextResponse.json(
//         { success: false, message: "Email required" },
//         { status: 400 }
//       );
//     }

//     const data = await resend.emails.send({
//       from: "onboarding@resend.dev",
//       to: "email",
//       subject: "Verify Email",
//       html: "<p>Click to verify your email</p>",
//     });

//     return NextResponse.json(
//       { success: true, data },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }