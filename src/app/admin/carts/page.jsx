// "use client";

// import { useEffect, useState } from "react";

// export default function AdminCarts() {
//   const [carts, setCarts] = useState([]);

//   useEffect(() => {
//     const load = async () => {
//       const res = await fetch("/api/cart");
//       const data = await res.json();
//       setCarts(data);
//     };

//     load();
//   }, []);

//   return (
//     <div className="p-5">
//       <h1 className="text-xl font-bold">🛒 All User Carts</h1>

//       {carts.map((c, i) => (
//         <div key={i} className="border p-3 mt-3">
//           <h2>User: {c.userEmail}</h2>

//           {c.items.map((item, j) => (
//             <div key={j} className="ml-4">
//               <p>{item.title} - Tk{item.price}</p>
//               <p>Status: {item.status}</p>

//               <button className="btn btn-success btn-sm">
//                 Approve
//               </button>
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();

      if (data.success) {
        setOrders(data.orders);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   loadOrders();
  // }, []);

    useEffect(() => {
  fetch("/api/orders")
    .then((res) => res.json())
    .then((data) => {
      console.log("ORDERS:", data);
      setOrders(data);
    });
}, []);

  const approveOrder = async (id) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire(
          "Success",
          "Order Approved Successfully",
          "success"
        );

        loadOrders();
      } else {
        Swal.fire(
          "Error",
          data.message,
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
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        📦 All Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold">
            No Orders Found
          </h2>
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-xl p-5 mb-5 shadow bg-white"
          >
            <h2 className="text-xl font-bold">
              Customer: {order.userEmail}
            </h2>

            <p className="mt-2">
              <strong>Total:</strong> Tk {order.total}
            </p>

            <p>
              <strong>Payment:</strong>{" "}
              <span className="text-green-600 font-bold">
                {order.payment}
              </span>
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`font-bold ${
                  order.status === "Approved"
                    ? "text-green-600"
                    : "text-orange-600"
                }`}
              >
                {order.status}
              </span>
            </p>

            <hr className="my-4" />

            <h3 className="font-semibold mb-3">
              Products
            </h3>

            {order.products?.map((product, index) => (
              <div
                key={index}
                className="flex justify-between border-b py-2"
              >
                <span>{product.title}</span>

                <span>
                  Tk {product.price} × {product.qty || 1}
                </span>
              </div>
            ))}

            {order.status !== "Approved" && (
              <button
                onClick={() => approveOrder(order._id)}
                className="btn btn-success mt-5"
              >
                Approve Order
              </button>
            )}
          </div>
        ))
      )}

    </div>
  );
}