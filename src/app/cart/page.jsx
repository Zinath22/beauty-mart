"use client";

import { useCart } from "@/context/CartContext";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Remove Item?",
      text: "This item will be removed from cart",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id);

        Swal.fire(
          "Deleted!",
          "Item removed from cart",
          "success"
        );
      }
    });
  };

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-5">
        🛒 My Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">
          No items in cart
        </p>
      ) : (
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 border p-4 rounded-lg shadow-sm items-center"
            >
              {/* 🖼 IMAGE */}
              <img
                src={item.img}
                alt={item.title}
                className="w-24 h-24 object-cover rounded"
              />

              {/* 📄 DETAILS */}
              <div className="flex-1">
                <h2 className="font-semibold text-lg">
                  {item.title}
                </h2>

                <p className="text-gray-600">
                  {item.description || "No description"}
                </p>

                <p className="text-primary font-bold mt-2">
                  TK {item.price}
                </p>
              </div>

              {/* 🗑 DELETE BUTTON */}
              <button
                onClick={() => handleDelete(item._id)}
                className="btn btn-error btn-sm"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


