// "use client";

// import { useCart } from "@/context/CartContext";
// import { FaTrash } from "react-icons/fa";
// import Swal from "sweetalert2";

// export default function CartPage() {
//   const { cart, removeFromCart } = useCart();

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Remove Item?",
//       text: "This item will be removed from cart",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         removeFromCart(id);

//         Swal.fire(
//           "Deleted!",
//           "Item removed from cart",
//           "success"
//         );
//       }
//     });
//   };

//   return (
//     <div className="p-5 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-5">
//         🛒 My Cart
//       </h1>

//       {cart.length === 0 ? (
//         <p className="text-center text-gray-500">
//           No items in cart
//         </p>
//       ) : (
//         <div className="space-y-4">
//           {cart.map((item) => (
//   <div
//     key={item._id}
//     className="flex gap-4 border p-4 rounded-lg shadow-sm items-center"
//   >
//               {/* 🖼 IMAGE */}
//               <img
//                 src={item.img}
//                 alt={item.title}
//                 className="w-24 h-24 object-cover rounded"
//               />

//               {/* 📄 DETAILS */}
//               <div className="flex-1">
//                 <h2 className="font-semibold text-lg">
//                   {item.title}
//                 </h2>

//                 <p className="text-gray-600">
//                   {item.description || "No description"}
//                 </p>

//                 <p className="text-primary font-bold mt-2">
//                   TK {item.price}
//                 </p>
//               </div>

//               {/* 🗑 DELETE BUTTON */}
//               <button
//                 onClick={() => handleDelete(item._id)}
//                 className="btn btn-error btn-sm"
//               >
//                 <FaTrash />
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }




// "use client";

// import { useCart } from "@/context/CartContext";
// import { FaTrash } from "react-icons/fa";
// import Swal from "sweetalert2";

// export default function CartPage() {
//   const { cart, removeFromCart } = useCart();

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Remove Item?",
//       text: "This item will be removed from cart",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         removeFromCart(id);

//         Swal.fire(
//           "Deleted!",
//           "Item removed from cart",
//           "success"
//         );
//       }
//     });
//   };

//   // ✅ CHECKOUT
//  const handleCheckout = async () => {
//   try {

//     if (totalPrice <= 0) {
//       Swal.fire(
//         "Error",
//         "Cart is empty",
//         "error"
//       );
//       return;
//     }

//     const res = await fetch("/api/payment", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         amount: Number(totalPrice),
//         name: "BeautyMart Customer",
//         email: "customer@test.com",
//         phone: "01700000000",
//       }),
//     });

//     const data = await res.json();

//     console.log("PAYMENT RESPONSE:", data);

//     if (data.success) {
//       window.location.href = data.url;
//     } else {
//       Swal.fire(
//         "Payment Error",
//         data.message,
//         "error"
//       );
//     }

//   } catch (error) {
//     console.log(error);

//     Swal.fire(
//       "Error",
//       "Something went wrong",
//       "error"
//     );
//   }
// };
//   // TOTAL PRICE
//   const totalPrice = cart.reduce(
//     (sum, item) => sum + Number(item.price || 0),
//     0
//   );

//   return (
//     <div className="p-5 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-5">
//         🛒 My Cart
//       </h1>

//       {cart.length === 0 ? (
//         <p className="text-center text-gray-500">
//           No items in cart
//         </p>
//       ) : (
//         <>
//           <div className="space-y-4">
//             {cart.map((item) => (
//               <div
//                 key={item._id}
//                 className="flex gap-4 border p-4 rounded-lg shadow-sm items-center"
//               >
//                 {/* IMAGE */}
//                 <img
//                   src={item.img}
//                   alt={item.title}
//                   className="w-24 h-24 object-cover rounded"
//                 />

//                 {/* DETAILS */}
//                 <div className="flex-1">
//                   <h2 className="font-semibold text-lg">
//                     {item.title}
//                   </h2>

//                   <p className="text-gray-600">
//                     {item.description ||
//                       "No description"}
//                   </p>

//                   <p className="text-primary font-bold mt-2">
//                     TK {item.price}
//                   </p>
//                 </div>

//                 {/* DELETE */}
//                 <button
//                   onClick={() =>
//                     handleDelete(item._id)
//                   }
//                   className="btn btn-error btn-sm"
//                 >
//                   <FaTrash />
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* TOTAL + CHECKOUT */}
//           <div className="mt-8 border-t pt-5 flex flex-col md:flex-row justify-between items-center gap-4">
//             <h2 className="text-2xl font-bold">
//               Total: TK {totalPrice}
//             </h2>

//             <button
//               onClick={handleCheckout}
//               className="btn btn-success btn-lg"
//             >
//               Proceed To Checkout
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

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

  const totalPrice = cart.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );

  const handleCheckout = async () => {
  try {
    if (totalPrice <= 0) {
      Swal.fire(
        "Error",
        "Cart is empty",
        "error"
      );
      return;
    }

    const res = await fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: totalPrice,
        name: "BeautyMart Customer",
        email: "customer@test.com",
        phone: "01700000000",
      }),
    });

    const data = await res.json();

    console.log(data);

    if (data.success && data.url) {
      window.location.href = data.url;
    } else {
      Swal.fire(
        "Payment Error",
        data.message || "Payment initialization failed",
        "error"
      );
    }

  } catch (error) {
    console.log(error);

    Swal.fire(
      "Error",
      "Something went wrong",
      "error"
    );
  }
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
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 border p-4 rounded-lg shadow-sm items-center"
              >
                <img
                  src={item.img || "/no-image.png"}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded"
                />

                <div className="flex-1">
                  <h2 className="font-semibold text-lg">
                    {item.title}
                  </h2>

                  <p className="text-gray-600">
                    {item.description ||
                      "No description"}
                  </p>

                  <p className="text-primary font-bold mt-2">
                    TK {item.price}
                  </p>
                </div>

                <button
                  onClick={() =>
                    handleDelete(item._id)
                  }
                  className="btn btn-error btn-sm"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t pt-5 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-2xl font-bold">
              Total: TK {totalPrice}
            </h2>

            <button
              onClick={handleCheckout}
              className="btn btn-success btn-lg"
            >
              Proceed To Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}