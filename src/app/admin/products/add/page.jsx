"use client";

import { useState } from "react";
import Swal from "sweetalert2";

export default function AddProduct() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    img: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      Swal.fire(
        "Success",
        "Product added",
        "success"
      );

      setForm({
        title: "",
        price: "",
        img: "",
      });
    }
  };

  return (
    <div className="p-5 max-w-md">

      <h1 className="text-2xl font-bold mb-5">
        Add Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-3"
      >

        <input
          type="text"
          placeholder="Title"
          className="input input-bordered w-full"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Price"
          className="input input-bordered w-full"
          value={form.price}
          onChange={(e) =>
            setForm({
              ...form,
              price: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Image URL"
          className="input input-bordered w-full"
          value={form.img}
          onChange={(e) =>
            setForm({
              ...form,
              img: e.target.value,
            })
          }
        />

        <button className="btn btn-primary w-full">
          Add Product
        </button>

      </form>
    </div>
  );
}