// export default function Success() {
//   return (
//     <div className="text-center py-20">
//       <h1 className="text-4xl text-green-600 font-bold">
//         Payment Successful
//       </h1>
//     </div>
//   );
// }


// "use client";

// import { useEffect } from "react";
// import Swal from "sweetalert2";

// export default function SuccessPage() {
//   useEffect(() => {
//     const saveOrder = async () => {
//       try {
//         // localStorage থেকে cart নাও
//         const cart = JSON.parse(localStorage.getItem("cart")) || [];

//         if (cart.length === 0) {
//           console.log("Cart Empty");
//           return;
//         }

//         const total = cart.reduce(
//           (sum, item) => sum + Number(item.price || 0),
//           0
//         );

//         const orderData = {
//           userEmail: session?.user?.email,
//           products: cart,
//           total,
//           payment: "Paid",
//           status: "Pending",
//         };

//         const res = await fetch("/api/orders", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(orderData),
//         });

//         console.log("API STATUS:", res.status);

//         const data = await res.json();

//         console.log("API RESPONSE:", data);

//         if (data.success) {
//           // cart clear
//           localStorage.removeItem("cart");

//           Swal.fire({
//             icon: "success",
//             title: "Order Saved",
//             text: "Payment Successful",
//           });
//         } else {
//           Swal.fire({
//             icon: "error",
//             title: "Save Failed",
//             text: data.message,
//           });
//         }
//       } catch (error) {
//         console.log(error);

//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: "Something went wrong",
//         });
//       }
//     };

//     saveOrder();
//   }, []);

//   return (
//     <div className="min-h-screen flex justify-center items-center">
//       <div className="bg-white shadow-xl rounded-xl p-10 text-center">
//         <h1 className="text-4xl font-bold text-green-600 mb-4">
//           ✅ Payment Successful
//         </h1>

//         <p className="text-gray-600">
//           Your order has been placed successfully.
//         </p>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useEffect } from "react";
// import Swal from "sweetalert2";
// import { getAuth } from "firebase/auth";
// import { useCart } from "@/context/CartContext";

// export default function SuccessPage() {
//   const { clearCart } = useCart();

//   useEffect(() => {
//     const saveOrder = async () => {
//       try {
//         const auth = getAuth();
//         const user = auth.currentUser;

//         const cart =
//           JSON.parse(localStorage.getItem("cart")) || [];

//         if (cart.length === 0) {
//           console.log("Cart Empty");
//           return;
//         }

//         const total = cart.reduce(
//           (sum, item) => sum + Number(item.price || 0),
//           0
//         );

//         const orderData = {
//           userEmail: user?.email || "guest@test.com",
//           products: cart,
//           total,
//           payment: "Paid",
//           status: "Pending",
//         };

//         console.log("ORDER DATA:", orderData);

//         const res = await fetch("/api/orders", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(orderData),
//         });

//         console.log("API STATUS:", res.status);

//         const data = await res.json();

//         console.log("API RESPONSE:", data);

//         if (data.success) {
//           localStorage.removeItem("cart");
//           clearCart();

//           Swal.fire({
//             icon: "success",
//             title: "Order Saved Successfully",
//             text: "Payment Successful",
//             timer: 2000,
//             showConfirmButton: false,
//           });
//         } else {
//           Swal.fire({
//             icon: "error",
//             title: "Save Failed",
//             text: data.message,
//           });
//         }
//       } catch (error) {
//         console.log(error);

//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: "Something went wrong",
//         });
//       }
//     };

//     saveOrder();
//   }, [clearCart]);

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100">
//       <div className="bg-white p-10 rounded-xl shadow-lg text-center">
//         <h1 className="text-4xl font-bold text-green-600 mb-4">
//           ✅ Payment Successful
//         </h1>

//         <p className="text-gray-600 mb-2">
//           Thank you for your purchase.
//         </p>

//         <p className="text-sm text-gray-500">
//           Your order has been saved successfully.
//         </p>
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect } from "react";
import Swal from "sweetalert2";
import { getAuth } from "firebase/auth";
import { useCart } from "@/context/CartContext";

export default function SuccessPage() {
  const { cart, clearCart } = useCart();

  useEffect(() => {
    const saveOrder = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          console.log("User not found");
          return;
        }

        if (!cart || cart.length === 0) {
          console.log("Cart Empty");
          return;
        }

        const total = cart.reduce(
          (sum, item) => sum + Number(item.price || 0),
          0
        );

        const orderData = {
          userEmail: user.email,
          products: cart,
          total,
          payment: "Paid",
          status: "Pending",
        };

        console.log("ORDER DATA:", orderData);

        const res = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });

        console.log("API STATUS:", res.status);

        const data = await res.json();

        console.log("API RESPONSE:", data);

        if (data.success) {
          clearCart();

          Swal.fire({
            icon: "success",
            title: "Payment Successful",
            text: "Your order has been placed successfully.",
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Order Save Failed",
            text: data.message || "Something went wrong",
          });
        }
      } catch (error) {
        console.log("SAVE ORDER ERROR:", error);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong",
        });
      }
    };

    if (cart.length > 0) {
      saveOrder();
    }
  }, [cart, clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-10 text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          ✅ Payment Successful
        </h1>

        <p className="text-gray-600">
          Thank you for your purchase.
        </p>

        <p className="text-sm text-gray-500">
         Your order has been saved successfully.
     </p>
      </div>
    </div>
  );
}