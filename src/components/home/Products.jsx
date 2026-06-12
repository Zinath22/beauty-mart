// import React from "react";

// import ProductCard from "../cards/ProductCard";
// import { getProducts } from "@/actions/server/product";

// const Products = async () => {
//   const products = await getProducts();
//   return (
//     <div>
//       <h2 className="text-center text-4xl font-bold mb-10">Our Products</h2>

//       <div className="grid md:grid-cols-3 gap-5">
//         {/* {products.map((product) => (
//           <ProductCard key={product.title} product={product}></ProductCard>
//         ))} */}

//         {products.map((product) => (
//   <ProductCard
//     key={product._id}
//     product={product}
//   />
// ))}
//       </div>
//     </div>
//   );
// };

// export default Products;



import React from "react";
import ProductCard from "../cards/ProductCard";
import { getProducts } from "@/actions/server/product";

const Products = async () => {
  const products = await getProducts();

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-10">

      {/* TITLE */}
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-12">
        Our Products
      </h2>

      {/* GRID */}
      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-3
        gap-4 sm:gap-6 lg:gap-8
      ">

        {products?.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}

      </div>

    </div>
  );
};

export default Products;