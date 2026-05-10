// import Image from "next/image";
// import Link from "next/link";
// import { FaStar } from "react-icons/fa";

// const ProductCard = ({ product }) => {
//   const { title, image, price, ratings, reviews, _id } = product;

  
//   const fixedImage = image?.replace("i.ibb.co.com", "i.ibb.com");
  

//   return (
//     <div className="card w-80 bg-base-100 shadow-lg relative">
//       <figure className="p-4">
//         <Image
//           width={200}
//           height={180}
//           src={fixedImage || "/placeholder.png"} // fallback added
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
//                   i < Math.round(ratings || 0)
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
//           <span className="font-bold text-lg">tk{price}</span>
            
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


import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const { title, img, price, rating, reviews, _id } = product;

  // safe image handling
  const fixedImage = img?.includes("i.ibb.co.com")
    ? img.replace("i.ibb.co.com", "i.ibb.co")
    : img;

  return (
    <div className="card w-80 bg-base-100 shadow-lg relative">
      <figure className="p-4">
        <Image
          width={200}
          height={180}
          src={fixedImage?.trim() ? fixedImage : "/placeholder.png"}
          alt={title}
          className="rounded-md w-full h-48 object-cover"
        />
      </figure>

      <div className="card-body p-4">
        <h2 className="card-title text-lg font-semibold">{title}</h2>

        <div className="flex items-center space-x-2 mt-2">
          <div className="flex text-yellow-400">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar
                key={i}
                className={
                  i < Math.round(rating || 0)
                    ? "opacity-100"
                    : "opacity-40"
                }
              />
            ))}
          </div>

          <span className="text-sm text-gray-600">
            ({reviews || 0} reviews)
          </span>
        </div>

        <div className="flex justify-between items-center mt-2">
          <span className="font-bold text-lg">tk {price}</span>
        </div>

        <Link
          href={`/products/${_id}`}
          className="btn btn-primary btn-outline mt-4 w-full"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;