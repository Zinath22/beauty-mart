// // "use server";

// // import { collections, dbConnect } from "@/lib/dbConnect";

// // export const getProducts = async () => {
// //   try {
// //     const db = await dbConnect();

// //     const products = await db
// //       .collection(collections.products)
// //       .find({})
// //       .toArray();

// //     return JSON.parse(JSON.stringify(products));
// //   } catch (error) {
// //     console.log(error);
// //     return [] ;
// //   }
// // };

// // "use server";

// // import { dbConnect } from "@/lib/dbConnect";

// // export const getProducts = async () => {
// //   try {
// //     const db = await dbConnect();

// //     const products = await db
// //       .collection("products")
// //       .find({})
// //       .toArray();

// //     return JSON.parse(JSON.stringify(products));
// //   } catch (error) {
// //     console.log(error);
// //     return [];
// //   }
// // };

// // "use server";

// // import { dbConnect } from "@/lib/dbConnect";
// // import { ObjectId } from "mongodb"; // ✅ add this

// // export const getProducts = async () => {
// //   try {
// //     const db = await dbConnect();

// //     const products = await db
// //       .collection("products")
// //       .find({})
// //       .toArray();

// //     return JSON.parse(JSON.stringify(products));
// //   } catch (error) {
// //     console.log(error);
// //     return [];
// //   }
// // };

// // // ✅ ADD THIS FUNCTION
// // export const getSingleProduct = async (id) => {
// //   try {
// //     const db = await dbConnect();

// //     const product = await db
// //       .collection("products")
// //       .findOne({ _id: new ObjectId(id) });

// //     return JSON.parse(JSON.stringify(product));
// //   } catch (error) {
// //     console.log(error);
// //     return null;
// //   }
// // };

// "use server";

// import { dbConnect } from "@/lib/dbConnect";
// import { ObjectId } from "mongodb";

// export const getSingleProduct = async (id) => {
//   try {
//     const db = await dbConnect();

//     let query = {};

//     // 🔥 check if valid ObjectId
//     if (ObjectId.isValid(id)) {
//       query = { _id: new ObjectId(id) };
//     } else {
//       query = { slug: id }; // fallback if you use string id
//     }

//     const product = await db
//       .collection("products")
//       .findOne(query);

//     return product ? JSON.parse(JSON.stringify(product)) : null;

//   } catch (error) {
//     console.log("Single product error:", error);
//     return null;
//   }
// };

"use server";

import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// 🔥 GET ALL PRODUCTS
export const getProducts = async () => {
  try {
    const db = await dbConnect();

    const products = await db
      .collection("products")
      .find({})
      .toArray();

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.log("getProducts error:", error);
    return [];
  }
};

// 🔥 GET SINGLE PRODUCT (FULL SAFE)
export const getSingleProduct = async (id) => {
  try {
    const db = await dbConnect();

    let product = null;

    // 1️⃣ MongoDB ObjectId check
    if (ObjectId.isValid(id)) {
      product = await db.collection("products").findOne({
        _id: new ObjectId(id),
      });
    }

    // 2️⃣ fallback: normal id
    if (!product) {
      product = await db.collection("products").findOne({
        id: id,
      });
    }

    // 3️⃣ fallback: slug
    if (!product) {
      product = await db.collection("products").findOne({
        slug: id,
      });
    }

    return product ? JSON.parse(JSON.stringify(product)) : null;
  } catch (error) {
    console.log("getSingleProduct error:", error);
    return null;
  }
};