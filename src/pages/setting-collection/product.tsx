"use client";

import { useState, useEffect } from "react";
import { ProductForm, ProductList, ProductHeader } from "@/components/products";
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
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
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
      alert(err.response?.data?.detail || "Failed to save product");
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete("/api/proxy", {
        headers: { Authorization: `JWT ${token}` },
        data: { endpoint: `${INVENTORY_ENDPOINTS.PRODUCTS}${id}/` },
      });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      console.error("Error deleting product:", err);
      alert(err.response?.data?.detail || "Failed to delete product");
    }
  };

  return (
    <main className="bg-gray-100 min-h-screen py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <ProductHeader
          onAdd={() => {
            setEditingProduct(null);
            setShowForm((prev) => !prev);
          }}
          onRefresh={fetchProducts}
        />

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded text-sm">{error}</div>
        )}

        {/* Form */}
        {showForm && (
          <section className="bg-white shadow rounded-lg p-6">
            <ProductForm
              onSubmit={handleSubmit}
              onCancel={() => setShowForm(false)}
              initialData={editingProduct || undefined}
            />
          </section>
        )}

        {/* Product List */}
        <section className="bg-white shadow rounded-lg p-6">
          <ProductList
            products={products}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </section>
      </div>
    </main>
  );
}
