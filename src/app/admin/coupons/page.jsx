"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const EMPTY_FORM = {
  code:           "",
  discountType:   "percentage",
  discountValue:  "",
  minOrderAmount: "",
  maxDiscount:    "",
  expiryDate:     "",
  usageLimit:     "",
};

export default function AdminCoupons() {
  const [coupons, setCoupons]   = useState([]);
  const [loading, setLoading]   = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId]     = useState(null);
  const [form, setForm]         = useState(EMPTY_FORM);

  const loadCoupons = async () => {
    try {
      const res  = await fetch("/api/coupons");
      const data = await res.json();

      if (data.success) {
        setCoupons(data.coupons);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setShowForm(true);
  };

  const openEdit = (coupon) => {
    setForm({
      code:           coupon.code,
      discountType:   coupon.discountType,
      discountValue:  coupon.discountValue,
      minOrderAmount: coupon.minOrderAmount,
      maxDiscount:    coupon.maxDiscount,
      expiryDate:     new Date(coupon.expiryDate).toISOString().split("T")[0],
      usageLimit:     coupon.usageLimit,
    });
    setEditId(coupon._id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const url    = editId ? `/api/coupons/${editId}` : "/api/coupons";
      const method = editId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        Swal.fire("Error", data.message, "error");
        return;
      }

      Swal.fire(
        "Success",
        editId ? "Coupon updated successfully" : "Coupon created successfully",
        "success"
      );

      setShowForm(false);
      setEditId(null);
      setForm(EMPTY_FORM);
      loadCoupons();
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title:              "Delete Coupon?",
      text:               "This action cannot be undone",
      icon:               "warning",
      showCancelButton:   true,
      confirmButtonColor: "#d33",
      confirmButtonText:  "Yes, delete it",
    });

    if (!result.isConfirmed) return;

    try {
      const res  = await fetch(`/api/coupons/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        Swal.fire("Deleted!", "Coupon deleted successfully", "success");
        loadCoupons();
      } else {
        Swal.fire("Error", data.message, "error");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  const handleToggle = async (coupon) => {
    try {
      const res = await fetch(`/api/coupons/${coupon._id}`, {
        method:  "PATCH",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ isActive: !coupon.isActive }),
      });

      const data = await res.json();

      if (data.success) {
        loadCoupons();
      } else {
        Swal.fire("Error", data.message, "error");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🏷️ Coupon Management</h1>

        <button
          onClick={openCreate}
          className="btn btn-primary"
        >
          + Create Coupon
        </button>
      </div>

      {/* Create / Edit Form */}
      {showForm && (
        <div className="border rounded-xl p-6 mb-8 shadow bg-white">
          <h2 className="text-xl font-bold mb-4">
            {editId ? "✏️ Edit Coupon" : "➕ Create New Coupon"}
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="label">
                <span className="label-text font-semibold">Coupon Code</span>
              </label>
              <input
                name="code"
                type="text"
                placeholder="e.g. SAVE20"
                className="input input-bordered w-full uppercase"
                value={form.code}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold">Discount Type</span>
              </label>
              <select
                name="discountType"
                className="select select-bordered w-full"
                value={form.discountType}
                onChange={handleChange}
                required
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (TK)</option>
              </select>
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold">
                  Discount Value{" "}
                  {form.discountType === "percentage" ? "(%)" : "(TK)"}
                </span>
              </label>
              <input
                name="discountValue"
                type="number"
                min="1"
                max={form.discountType === "percentage" ? 100 : undefined}
                placeholder={form.discountType === "percentage" ? "e.g. 20" : "e.g. 100"}
                className="input input-bordered w-full"
                value={form.discountValue}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold">Minimum Order Amount (TK)</span>
              </label>
              <input
                name="minOrderAmount"
                type="number"
                min="0"
                placeholder="e.g. 500 (0 = no minimum)"
                className="input input-bordered w-full"
                value={form.minOrderAmount}
                onChange={handleChange}
              />
            </div>

            {form.discountType === "percentage" && (
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Max Discount (TK)</span>
                </label>
                <input
                  name="maxDiscount"
                  type="number"
                  min="0"
                  placeholder="e.g. 200 (0 = no cap)"
                  className="input input-bordered w-full"
                  value={form.maxDiscount}
                  onChange={handleChange}
                />
              </div>
            )}

            <div>
              <label className="label">
                <span className="label-text font-semibold">Expiry Date</span>
              </label>
              <input
                name="expiryDate"
                type="date"
                className="input input-bordered w-full"
                value={form.expiryDate}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold">Usage Limit</span>
              </label>
              <input
                name="usageLimit"
                type="number"
                min="0"
                placeholder="e.g. 100 (0 = unlimited)"
                className="input input-bordered w-full"
                value={form.usageLimit}
                onChange={handleChange}
              />
            </div>

            <div className="md:col-span-2 flex gap-3 mt-2">
              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : editId ? (
                  "Update Coupon"
                ) : (
                  "Create Coupon"
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditId(null);
                  setForm(EMPTY_FORM);
                }}
                className="btn btn-ghost"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Coupons Table */}
      {coupons.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold">No Coupons Found</h2>
          <p className="text-gray-500 mt-2">Create your first coupon to get started</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full border rounded-xl shadow">
            <thead>
              <tr className="bg-base-200">
                <th>Code</th>
                <th>Type</th>
                <th>Discount</th>
                <th>Min Order</th>
                <th>Expiry</th>
                <th>Used / Limit</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon._id}>
                  <td className="font-bold font-mono">{coupon.code}</td>

                  <td className="capitalize">{coupon.discountType}</td>

                  <td>
                    {coupon.discountType === "percentage"
                      ? `${coupon.discountValue}%`
                      : `TK ${coupon.discountValue}`}
                    {coupon.discountType === "percentage" &&
                      coupon.maxDiscount > 0 && (
                        <span className="text-xs text-gray-500 block">
                          Max: TK {coupon.maxDiscount}
                        </span>
                      )}
                  </td>

                  <td>
                    {coupon.minOrderAmount > 0
                      ? `TK ${coupon.minOrderAmount}`
                      : "None"}
                  </td>

                  <td>
                    {new Date(coupon.expiryDate).toLocaleDateString("en-BD")}
                    {new Date() > new Date(coupon.expiryDate) && (
                      <span className="badge badge-error badge-sm ml-1">Expired</span>
                    )}
                  </td>

                  <td>
                    {coupon.usedCount} /{" "}
                    {coupon.usageLimit > 0 ? coupon.usageLimit : "∞"}
                  </td>

                  <td>
                    <input
                      type="checkbox"
                      className="toggle toggle-success toggle-sm"
                      checked={coupon.isActive}
                      onChange={() => handleToggle(coupon)}
                    />
                  </td>

                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(coupon)}
                        className="btn btn-warning btn-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(coupon._id)}
                        className="btn btn-error btn-sm"
                      >
                        Delete
                      </button>
                    </div>
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
