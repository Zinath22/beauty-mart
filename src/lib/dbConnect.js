// // const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = process.env.MONGODB_URI;
// const dbname = process.env.DBNAME;
// const collections = {
//     PRODUCTS: "products",
// };


// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// export const dbConnect=(cname)=>{
//     return client.db(dbname).collections(cname);

// };


// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI;

// const client = new MongoClient(uri);

// export const dbConnect = async () => {
//   await client.connect();
//   return client.db("beautymartdb");
// };

// export const collections = {
//   USERS: "users",
// };

// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI;

// let client;
// let clientPromise;

// // global cache (Next.js dev mode issue fix)
// if (!global._mongoClientPromise) {
//   client = new MongoClient(uri);
//   global._mongoClientPromise = client.connect();
// }

// clientPromise = global._mongoClientPromise;

// export const dbConnect = async () => {
//   const client = await clientPromise;
//   return client.db(process.env.DB_NAME);
// };

// export const collections = {
//   USERS: "users",
// };

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

if (!uri) {
  throw new Error("Please add MONGODB_URI in .env.local");
}

// ⚠️ global cache fix for Next.js hot reload
let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

// ✅ server-only DB connect function
export const dbConnect = async () => {
  const client = await clientPromise;
  return client.db(dbName);
};

// optional helper
export const collections = {
  USERS: "users",
};