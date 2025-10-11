"use client";

import { useState, useEffect } from "react";
import { ProductForm, ProductList } from "@/components/products";
import { Product } from "@/types";
import axios from "axios";
import { getAccessToken } from "@/lib/api";
import { INVENTORY_ENDPOINTS } from "@/lib/apiEndpoints";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const token = getAccessToken();

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/api/proxy", {
        params: { endpoint: INVENTORY_ENDPOINTS.PRODUCTS },
        headers: { Authorization: `JWT ${token}` },
      });
      setProducts(res.data);
    } catch (err: any) {
      console.error("Error fetching products:", err);
      setError(err.response?.data?.detail || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchProducts();
  }, [token]);

  const handleSubmit = async (data: Product) => {
    try {
      if (editingProduct) {
        await axios.put(
          "/api/proxy",
          { endpoint: `${INVENTORY_ENDPOINTS.PRODUCTS}${data.id}/`, payload: data },
          { headers: { Authorization: `JWT ${token}` } }
        );
        setProducts((prev) => prev.map((p) => (p.id === data.id ? data : p)));
      } else {
        const res = await axios.post(
          "/api/proxy",
          { endpoint: INVENTORY_ENDPOINTS.PRODUCTS, payload: data },
          { headers: { Authorization: `JWT ${token}` } }
        );
        setProducts((prev) => [...prev, res.data]);
      }
      setEditingProduct(null);
      setShowForm(false);
    } catch (err: any) {
      console.error("Error saving product:", err);
      alert(err.response?.data?.detail || "Failed to save product. Try again later.");
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete("/api/proxy", {
        headers: { Authorization: `JWT ${token}` },
        data: { endpoint: `${INVENTORY_ENDPOINTS.PRODUCTS}${id}/` },
      });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      console.error("Error deleting product:", err);
      return err?.response?.data?.detail ||
             err?.message ||
             "Failed to delete product. Please try again later.";
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-6 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Products</h1>
          <button
            onClick={() => { setEditingProduct(null); setShowForm((prev) => !prev); }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            {showForm ? "Close Form" : "Add Product"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="text-red-600 text-sm bg-red-100 p-2 rounded">{error}</div>
        )}

        {/* Form Section */}
        {showForm && (
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              {editingProduct ? "Edit Product" : "Add Product"}
            </h2>
            <ProductForm
              onSubmit={handleSubmit}
              onCancel={() => setShowForm(false)}
              initialData={editingProduct || undefined}
            />
          </section>
        )}

        {/* Products List */}
         {/*<section >
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Existing Products</h2>
          <ProductList
            products={products}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          /> 
        </section>*/}

      </div>
    </main>
  );
}
