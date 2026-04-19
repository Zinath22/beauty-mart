// // import { dbConnect } from "@/lib/dbConnect";

// import { dbConnect } from "@/lib/dbConnect";

// export async function POST(req) {
//   try {
//     const { token } = await req.json();

//     const db = await dbConnect();
//     const users = db.collection("users");

//     const user = await users.findOne({ verifyToken: token });

    

//     if (!user) {
//       return Response.json({
//         success: false,
//         message: "Invalid or expired link",
//       });
//     }

//     await users.updateOne(
//       { _id: user._id },
//       {
//         $set: { verified: true },
//         $unset: { verifyToken: "" },
//       }
//     );

//     return Response.json({
//       success: true,
//       message: "Email verified successfully",
//     });
//   } catch (error) {
//     return Response.json({
//       success: false,
//       message: error.message,
//     });
//   }
// }


import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token required" },
        { status: 400 }
      );
    }

    const db = await dbConnect();
    const users = db.collection("users");

    const user = await users.findOne({ verifyToken: token });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired link" },
        { status: 400 }
      );
    }

    await users.updateOne(
      { _id: user._id },
      {
        $set: { verified: true },
        $unset: { verifyToken: "" },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Email verified successfully",
    });

  } catch (error) {
    console.log("VERIFY ERROR:", error);

    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}