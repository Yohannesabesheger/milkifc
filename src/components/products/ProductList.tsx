"use client";

import { useState } from "react";
import { Product } from "@/types";

interface ProductListProps {
  products: Product[];
  loading?: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => Promise<string | void>; // Return string on error
  onRefresh?: () => void;
}

export default function ProductList({ products, loading, onEdit, onDelete }: ProductListProps) {
  const [error, setError] = useState("");

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    const friendlyMessage = await onDelete(id);
    if (friendlyMessage) {
      setError(friendlyMessage);
      setTimeout(() => setError(""), 5000);
    }
  };

  if (loading) return <p className="text-gray-600 text-sm">Loading products...</p>;
  if (products.length === 0) return <p className="text-gray-600 text-sm">No products available.</p>;

  return (
    <div className="overflow-x-auto">
      {error && (
        <div className="mb-3 p-2 bg-red-100 text-red-800 rounded text-sm font-medium">{error}</div>
      )}
      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Name</th>
            <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Category</th>
            <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Unit</th>
            <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Status</th>
            <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50 transition">
              <td className="px-5 py-3 font-medium text-gray-800">{p.name}</td>
              <td className="px-5 py-3 text-gray-700">{p.package_name}</td>
              <td className="px-5 py-3 text-gray-700">{p.unit_of_measure}</td>
              <td className="px-5 py-3">
                <span
                  className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                    p.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                </span>
              </td>
              <td className="px-5 py-3 flex gap-3">
                <button
                  onClick={() => onEdit(p)}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-red-600 hover:text-red-800 font-medium text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
