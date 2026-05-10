import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// 🔥 UPDATE PRODUCT
export async function PATCH(req, { params }) {
  try {
    // ✅ await params
    const { id } = await params;

    // ❌ invalid id
    if (!ObjectId.isValid(id)) {
      return Response.json(
        {
          success: false,
          message: "Invalid product ID",
        },
        { status: 400 }
      );
    }

    const body = await req.json();

    const db = await dbConnect();

    await db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...body,
        },
      }
    );

    return Response.json({
      success: true,
      message: "Product updated",
    });

  } catch (error) {
    console.log("PATCH ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Update failed",
      },
      { status: 500 }
    );
  }
}

// 🔥 DELETE PRODUCT
export async function DELETE(req, { params }) {
  try {
    // ✅ await params
    const { id } = await params;

    // ❌ invalid id
    if (!ObjectId.isValid(id)) {
      return Response.json(
        {
          success: false,
          message: "Invalid product ID",
        },
        { status: 400 }
      );
    }

    const db = await dbConnect();

    await db.collection("products").deleteOne({
      _id: new ObjectId(id),
    });

    return Response.json({
      success: true,
      message: "Product deleted",
    });

  } catch (error) {
    console.log("DELETE ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Delete failed",
      },
      { status: 500 }
    );
  }
}