// "use server";

// import { collections, dbConnect } from "@/lib/dbConnect";

// export const getProducts = async () => {
//   try {
//     const db = await dbConnect();

//     const products = await db
//       .collection(collections.products)
//       .find({})
//       .toArray();

//     return JSON.parse(JSON.stringify(products));
//   } catch (error) {
//     console.log(error);
//     return [] ;
//   }
// };

// "use server";

// import { dbConnect } from "@/lib/dbConnect";

// export const getProducts = async () => {
//   try {
//     const db = await dbConnect();

//     const products = await db
//       .collection("products")
//       .find({})
//       .toArray();

//     return JSON.parse(JSON.stringify(products));
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };

"use server";

import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb"; // ✅ add this

export const getProducts = async () => {
  try {
    const db = await dbConnect();

    const products = await db
      .collection("products")
      .find({})
      .toArray();

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.log(error);
    return [];
  }
};

// ✅ ADD THIS FUNCTION
export const getSingleProduct = async (id) => {
  try {
    const db = await dbConnect();

    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });

    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.log(error);
    return null;
  }
};