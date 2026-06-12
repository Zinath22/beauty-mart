


// import Image from "next/image";
// import Link from "next/link";
// import { FaStar } from "react-icons/fa";

// const ProductCard = ({ product }) => {
//   const { title, img, price, rating, reviews, _id } = product;

//   // safe image handling
//   const fixedImage = img?.includes("i.ibb.co.com")
//     ? img.replace("i.ibb.co.com", "i.ibb.co")
//     : img;

//   return (
//     <div className="card w-80 bg-base-100 shadow-lg relative">
//       <figure className="p-4">
//         <Image
//           width={200}
//           height={180}
//           src={fixedImage?.trim() ? fixedImage : "/placeholder.png"}
//           alt={title}
//           className="rounded-md w-full h-48 object-cover"
//         />
//       </figure>

//       <div className="card-body p-4">
//         <h2 className="card-title text-lg font-semibold">{title}</h2>

//         <div className="flex items-center space-x-2 mt-2">
//           <div className="flex text-yellow-400">
//             {Array.from({ length: 5 }, (_, i) => (
//               <FaStar
//                 key={i}
//                 className={
//                   i < Math.round(rating || 0)
//                     ? "opacity-100"
//                     : "opacity-40"
//                 }
//               />
//             ))}
//           </div>

//           <span className="text-sm text-gray-600">
//             ({reviews || 0} reviews)
//           </span>
//         </div>

//         <div className="flex justify-between items-center mt-2">
//           <span className="font-bold text-lg">tk {price}</span>
//         </div>

//         <Link
//           href={`/products/${_id}`}
//           className="btn btn-primary btn-outline mt-4 w-full"
//         >
//           View Details
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import React from "react";
import Link from "next/link";

export default function ProductCard({ product }) {
  if (!product) return null;

  return (
    <div className="group rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-pink-100 hover:-translate-y-2">

      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <img
          src={product.img || "/no-image.png"}
          alt={product.title}
          className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
        />

        {/* BADGE */}
        <span className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
          {product.discount || 10}% OFF
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-5">

        <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
          {product.title}
        </h2>

        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-extrabold text-primary">
            ৳ {product.price}
          </span>

          <span className="bg-pink-100 text-primary px-3 py-1 rounded-full text-sm">
            ⭐ {product.rating || 4.5}
          </span>
        </div>

        <div className="flex gap-3">

          <button className="flex-1 bg-gradient-to-r from-orange-500 to-rose-500 text-white py-2 rounded-xl font-semibold">
            Add To Cart
          </button>

          <Link href={`/products/${product._id}`}>
            {/* <button className="px-4 rounded-xl border border-pink-300 text-primary-600">
              View
            </button> */}
            <button className="w-full px-5 py-2.5 rounded-xl border border-rose-300 text-rose-600 font-semibold text-sm sm:text-base 
hover:bg-gradient-to-r hover:from-orange-500 hover:to-rose-500 hover:text-white 
transition-all duration-300 shadow-sm hover:shadow-md">
  View
</button>
          </Link>

        </div>

      </div>
    </div>
  );
}