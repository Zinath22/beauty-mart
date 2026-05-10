// "use client";

// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";

// export default function ManageProducts() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetch("/api/products")
//       .then(res => res.json())
//       .then(data => setProducts(data));
//   }, []);

//   const deleteProduct = async (id) => {
//     await fetch("/api/products", {
//       method: "DELETE",
//       body: JSON.stringify({ id }),
//     });

//     setProducts(prev => prev.filter(p => p._id !== id));

//     Swal.fire("Deleted", "Product removed", "success");
//   };

//   return (
//     <div>
//       <h1 className="text-xl font-bold mb-4">Manage Products</h1>

//       <button
//         onClick={() => location.href = "/admin/products/add"}
//         className="btn btn-primary mb-4"
//       >
//         ➕ Add Product
//       </button>

//       {products.map(p => (
//         <div key={p._id} className="border p-3 mb-2 flex justify-between">
//           <span>{p.title}</span>

//           <div className="space-x-2">
//             <button
//               onClick={() => location.href = `/admin/products/edit/${p._id}`}
//               className="btn btn-info btn-sm"
//             >
//               Edit
//             </button>

//             <button
//               onClick={() => deleteProduct(p._id)}
//               className="btn btn-error btn-sm"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 LOAD PRODUCTS
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("/api/products", {
          cache: "no-store",
        });

        const data = await res.json();

        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.log("LOAD ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // 🔥 DELETE PRODUCT
  const deleteProduct = async (id) => {
    try {
      const confirm = await Swal.fire({
        title: "Are you sure?",
        text: "This product will be deleted",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete",
      });

      if (!confirm.isConfirmed) return;

      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire(
          "Deleted!",
          "Product deleted successfully",
          "success"
        );

        // 🔥 REMOVE FROM UI
        setProducts((prev) =>
          prev.filter((p) => p._id !== id)
        );
      } else {
        Swal.fire(
          "Error",
          data.message || "Delete failed",
          "error"
        );
      }

    } catch (error) {
      console.log("DELETE ERROR:", error);

      Swal.fire(
        "Error",
        "Server error",
        "error"
      );
    }
  };

  // 🔥 LOADING
  if (loading) {
    return (
      <div className="p-5">
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="p-5">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">

        <h1 className="text-2xl font-bold">
          Manage Products ({products.length})
        </h1>

        <Link href="/admin/products/add">
          <button className="btn btn-primary">
            Add Product
          </button>
        </Link>

      </div>

      {/* EMPTY */}
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="space-y-3">
{products.map((product) => (
  <div
    key={product._id.toString()}
    className="border p-4 rounded-lg flex justify-between items-center"
  >

    <div className="flex items-center gap-4">

      <img
        src={product.img}
        alt={product.title}
        className="w-16 h-16 object-cover rounded"
      />

      <div>
        <p className="font-bold text-lg">
          {product.title}
        </p>

        <p className="text-sm text-gray-500">
          ৳ {product.price}
        </p>
      </div>

    </div>

    <div className="flex gap-2">

      <Link
        href={`/admin/products/edit/${product._id.toString()}`}
      >
        <button className="btn btn-warning btn-sm">
          Edit
        </button>
      </Link>

      <button
        onClick={() =>
          deleteProduct(product._id.toString())
        }
        className="btn btn-error btn-sm"
      >
        Delete
      </button>

    </div>

  </div>
))}

        </div>
      )}
    </div>
  );
}