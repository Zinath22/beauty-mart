


// "use client";

// import { useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { FaCartPlus } from "react-icons/fa";
// import Swal from "sweetalert2";

// import { handleCart } from "@/actions/server/cart";
// import { useAuth } from "@/provider/AuthProvider";

// // 🔥 ADD THIS
// import { useCart } from "@/context/CartContext";

// const CartButton = ({ product }) => {
//   const { user } = useAuth();
//   const { addToCart } = useCart(); // 🔥 local cart update

//   const router = useRouter();
//   const path = usePathname();

//   const [isLoading, setIsLoading] = useState(false);

//   const handleAddToCart = async () => {
//     if (!user) {
//       router.push(`/login?callbackUrl=${path}`);
//       return;
//     }

//     setIsLoading(true);

//     try {
//       // 🔥 1. SERVER SIDE SAVE
//       const result = await handleCart({ product, inc: true });

//       if (result?.success) {
//         // 🔥 2. UI UPDATE (IMPORTANT)
//         addToCart(product);

//         Swal.fire("Success", "Added to cart", "success");
//       } else {
//         Swal.fire("Error", "Something went wrong", "error");
//       }

//     } catch (error) {
//       console.log(error);
//       Swal.fire("Error", "Server error", "error");
//     }

//     setIsLoading(false);
//   };

//   return (
//     <button
//       onClick={handleAddToCart}
//       disabled={isLoading}
//       className="btn btn-primary w-full flex gap-2"
//     >
//       <FaCartPlus />
//       {isLoading ? "Adding..." : "Add to Cart"}
//     </button>
//   );
// };

// export default CartButton;


"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaCartPlus } from "react-icons/fa";
import Swal from "sweetalert2";

import { handleCart } from "@/actions/server/cart";
import { useAuth } from "@/provider/AuthProvider";
import { useCart } from "@/context/CartContext";

const CartButton = ({ product }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();

  const router = useRouter();
  const path = usePathname();

  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    // 🔥 STEP 1: LOGIN CHECK FIRST (IMPORTANT)
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login first to add product to cart",
      });

      router.push(`/login?callbackUrl=${path}`);
      return;
    }

    setIsLoading(true);

    try {
      // 🔥 STEP 2: SERVER CART SAVE
      const result = await handleCart({
        product,
        inc: true,
      });

      if (result?.success) {
        // 🔥 STEP 3: UI UPDATE
        addToCart(product);

        Swal.fire({
          icon: "success",
          title: "Added to Cart",
          showConfirmButton: false,
          timer: 1200,
        });
      } else {
        Swal.fire("Error", "Failed to add product", "error");
      }

    } catch (error) {
      console.log("CART ERROR:", error);
      Swal.fire("Error", "Server error", "error");
    }

    setIsLoading(false);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading}
      className="btn btn-primary w-full flex gap-2 items-center justify-center"
    >
      <FaCartPlus />
      {isLoading ? "Adding..." : "Add to Cart"}
    </button>
  );
};

export default CartButton;