import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const db = await dbConnect();

  await db.collection("orders").updateOne(
    {
      _id: new ObjectId(params.id),
    },
    {
      $set: {
        orderStatus: "Approved",
      },
    }
  );

  return NextResponse.json({
    success: true,
  });
}