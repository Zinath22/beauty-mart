


// "use client";

// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";

// export default function AdminOrders() {
//   const [orders, setOrders] = useState([]);

//   const loadOrders = async () => {
//     try {
//       const res  = await fetch("/api/orders");
//       const data = await res.json();

//       if (data.success) {
//         setOrders(data.orders);
//       } else {
//         setOrders([]);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetch("/api/orders")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("ORDERS:", data);
//         setOrders(data);
//       });
//   }, []);

//   const approveOrder = async (id) => {
//     try {
//       const res  = await fetch(`/api/orders/${id}`, { method: "PATCH" });
//       const data = await res.json();

//       if (data.success) {
//         Swal.fire("Success", "Order Approved Successfully", "success");
//         loadOrders();
//       } else {
//         Swal.fire("Error", data.message, "error");
//       }
//     } catch (error) {
//       console.log(error);
//       Swal.fire("Error", "Something went wrong", "error");
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">

//       <h1 className="text-3xl font-bold mb-6">
//         📦 All Orders
//       </h1>

//       {orders.length === 0 ? (
//         <div className="text-center py-20">
//           <h2 className="text-xl font-semibold">
//             No Orders Found
//           </h2>
//         </div>
//       ) : (
//         orders.map((order) => (
//           <div
//             key={order._id}
//             className="border rounded-xl p-5 mb-5 shadow bg-white"
//           >
//             <h2 className="text-xl font-bold">
//               Customer: {order.userEmail}
//             </h2>

//             <p className="mt-2">
//               <strong>Payment:</strong>{" "}
//               <span className="text-green-600 font-bold">
//                 {order.payment}
//               </span>
//             </p>

//             <p>
//               <strong>Status:</strong>{" "}
//               <span
//                 className={`font-bold ${
//                   order.status === "Approved"
//                     ? "text-green-600"
//                     : "text-orange-600"
//                 }`}
//               >
//                 {order.status}
//               </span>
//             </p>

//             <hr className="my-4" />

//             <h3 className="font-semibold mb-3">Products</h3>

//             {order.products?.map((product, index) => (
//               <div
//                 key={index}
//                 className="flex justify-between border-b py-2"
//               >
//                 <span>{product.title}</span>
//                 <span>Tk {product.price} × {product.qty || 1}</span>
//               </div>
//             ))}

//             {/* PRICE SUMMARY */}
//             <div className="mt-4 bg-base-100 rounded-lg p-4 space-y-2">

//               <div className="flex justify-between text-base">
//                 <span>Subtotal</span>
//                 <span>Tk {order.originalAmount ?? order.total}</span>
//               </div>

//               {order.couponCode && (
//                 <div className="flex justify-between text-green-600 font-semibold">
//                   <span>
//                     Discount{" "}
//                     <span className="badge badge-success badge-sm ml-1">
//                       {order.couponCode}
//                     </span>
//                   </span>
//                   <span>- Tk {order.discountAmount}</span>
//                 </div>
//               )}

//               <div className="flex justify-between text-lg font-bold border-t pt-2">
//                 <span>Total Paid</span>
//                 <span>Tk {order.total}</span>
//               </div>

//               {order.couponCode && order.discountAmount > 0 && (
//   <div className="text-center text-green-600 text-sm font-semibold bg-green-50 rounded-lg py-2 mt-1">
//     🎉 Customer saved Tk {order.discountAmount} on this order!
//   </div>
// )}

//             </div>

//             {order.status !== "Approved" && (
//               <button
//                 onClick={() => approveOrder(order._id)}
//                 className="btn btn-success mt-5"
//               >
//                 Approve Order
//               </button>
//             )}
//           </div>
//         ))
//       )}

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
      const res  = await fetch("/api/orders");
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
      const res  = await fetch(`/api/orders/${id}`, { method: "PATCH" });
      const data = await res.json();

      if (data.success) {
        Swal.fire("Success", "Order Approved Successfully", "success");
        loadOrders();
      } else {
        Swal.fire("Error", data.message, "error");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">📦 All Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold">No Orders Found</h2>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow border">
          <table className="table table-zebra w-full">

            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th>#</th>
                <th>Email</th>
                <th className="text-center">Payment</th>
                <th className="text-center">Status</th>
                <th>Products</th>
                <th className="text-center">Qty</th>
                <th className="text-right">Total Price</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id} className="align-middle">

                  <td className="font-semibold text-gray-500">
                    {index + 1}
                  </td>

                  <td className="text-sm max-w-[180px] break-words">
                    {order.userEmail}
                  </td>

                  <td className="text-center">
                    <span className="badge badge-success badge-sm">
                      {order.payment}
                    </span>
                  </td>

                  <td className="text-center">
                    <span
                      className={`badge badge-sm ${
                        order.status === "Approved"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="text-sm">
                    {order.products?.map((p, i) => (
                      <div key={i}>{p.title}</div>
                    ))}
                  </td>

                  <td className="text-center text-sm">
                    {order.products?.map((p, i) => (
                      <div key={i}>{p.qty || 1}</div>
                    ))}
                  </td>

                  <td className="text-right">
                    <span className="font-bold">Tk {order.total}</span>
                    {order.couponCode && order.discountAmount > 0 && (
                      <div className="text-green-600 text-xs mt-1">
                        🎉 saved Tk {order.discountAmount}
                      </div>
                    )}
                  </td>

                  <td className="text-center">
                    {order.status !== "Approved" ? (
                      <button
                        onClick={() => approveOrder(order._id)}
                        className="btn btn-success btn-sm"
                      >
                        Approve
                      </button>
                    ) : (
                      <span className="text-green-600 text-sm font-semibold">
                        ✅ Done
                      </span>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

    </div>
  );
}
