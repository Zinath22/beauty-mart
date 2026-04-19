"use client";

import { useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import { FaCartPlus } from "react-icons/fa";
import Swal from "sweetalert2";

import { handleCart } from "@/actions/server/cart";
import { useSession } from "next-auth/react";


const CartButton = ({ product }) => {
  const session = useSession();
  const router = useRouter();
  const path = usePathname();

  const [isLoading, setIsLoading] = useState(false);

  const isLogin = session?.status === "authenticated";

  const handleAddToCart = async () => {
    setIsLoading(true);

    try {
      if (isLogin) {
        const result = await handleCart({ product, inc: true });

        if (result?.success) {
          Swal.fire("Success", "Added to cart", "success");
        } else {
          Swal.fire("Error", "Something went wrong", "error");
        }
      } else {
        router.push(`/login?callbackUrl=${path}`);
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Server error", "error");
    }

    setIsLoading(false);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={session.status === "loading" || isLoading}
      className="btn btn-primary w-full flex gap-2"
    >
      <FaCartPlus />
      {isLoading ? "Adding..." : "Add to Cart"}
    </button>
  );
};

export default CartButton;