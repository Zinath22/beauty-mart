import { dbConnect } from "@/lib/dbConnect";

export async function POST(req) {
  try {
    const body = await req.json();

    const db = await dbConnect();

    await db.collection("reviews").insertOne({
      ...body,
      createdAt: new Date(),
    });

    return Response.json({
      success: true,
      message: "Review added",
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const productId = searchParams.get("productId");

  const db = await dbConnect();

  const reviews = await db
    .collection("reviews")
    .find({ productId })
    .sort({ createdAt: -1 })
    .toArray();

  return Response.json(reviews);
}