// pages/products.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAccessToken } from "@/lib/api";
import { API } from "@/lib/apiEndpoints";

type Product = {
  id: number;
  code: string;
  name: string;
  description: string;
  category: number;
  unit_of_measure: string;
  status: string;
  is_authorized: boolean;
  authorization_time: string | null;
  created_at: string;
  updated_at: string;
};

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [unit, setUnit] = useState("KG");
  const [status, setStatus] = useState("ACTIVE");
  const [category, setCategory] = useState(1);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = getAccessToken();

  useEffect(() => {
    if (!token) return;
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/proxy", {
          params: { endpoint: API.PRODUCTS },
          headers: { Authorization: `JWT ${token}` },
        });
        setProducts(res.data);
      } catch (err: any) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products");
      }
    };
    fetchProducts();
  }, [token]);

  const handleSubmit = async () => {
    if (!code || !name || !token) return;
    setLoading(true);
    setError("");

    const now = new Date().toISOString();
    const payload: Partial<Product> = {
      code,
      name,
      description,
      category,
      unit_of_measure: unit,
      status,
      is_authorized: true,
      authorization_time: null,
      created_at: editingId ? products.find(p => p.id === editingId)?.created_at : now,
      updated_at: now,
    };

    try {
      if (editingId) {
        const res = await axios.put("/api/proxy", {
          endpoint: `${API.PRODUCTS}${editingId}/`,
          payload,
        }, {
          headers: { Authorization: `JWT ${token}` },
        });
        setProducts(prev => prev.map(p => p.id === editingId ? res.data : p));
        setEditingId(null);
      } else {
        const res = await axios.post("/api/proxy", {
          endpoint: API.PRODUCTS,
          payload,
        }, {
          headers: { Authorization: `JWT ${token}` },
        });
        setProducts(prev => [...prev, res.data]);
      }

      setCode("");
      setName("");
      setDescription("");
      setUnit("KG");
      setStatus("ACTIVE");
      setCategory(1);
    } catch (err: any) {
      console.error("Error saving product:", err);
      setError(err.response?.data?.detail || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setCode(product.code);
    setName(product.name);
    setDescription(product.description);
    setUnit(product.unit_of_measure);
    setStatus(product.status);
    setCategory(product.category);
  };

  const handleCancel = () => {
    setEditingId(null);
    setCode("");
    setName("");
    setDescription("");
    setUnit("KG");
    setStatus("ACTIVE");
    setCategory(1);
  };

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>

      <section className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">{editingId ? "Edit Product" : "Add New Product"}</h2>
        {error && <div className="mb-2 text-red-600">{error}</div>}
        <div className="flex flex-col space-y-3">
          <input
            type="text"
            placeholder="Product Code"
            className="p-2 border rounded"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <input
            type="text"
            placeholder="Product Name"
            className="p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Category"
            className="p-2 border rounded"
            value={category}
            onChange={(e) => setCategory(Number(e.target.value))}
          />
          <select
            className="p-2 border rounded"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="KG">KG</option>
            <option value="L">L</option>
            <option value="PCS">PCS</option>
          </select>
          <select
            className="p-2 border rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 text-white rounded ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Saving..." : editingId ? "Update" : "Add Product"}
            </button>
            {editingId && (
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="p-4 bg-white rounded shadow overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Existing Products</h2>
        {products.length === 0 ? (
          <p>No products yet.</p>
        ) : (
          <table className="min-w-full border border-gray-300 table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-3 py-2">Code</th>
                <th className="border px-3 py-2">Name</th>
                <th className="border px-3 py-2">Description</th>
                <th className="border px-3 py-2">Unit</th>
                <th className="border px-3 py-2">Status</th>
                <th className="border px-3 py-2">Authorized</th>
                <th className="border px-3 py-2">Category</th>
                <th className="border px-3 py-2">Created</th>
                <th className="border px-3 py-2">Updated</th>
                <th className="border px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-100">
                  <td className="border px-3 py-2">{p.code}</td>
                  <td className="border px-3 py-2">{p.name}</td>
                  <td className="border px-3 py-2">{p.description}</td>
                  <td className="border px-3 py-2">{p.unit_of_measure}</td>
                  <td className="border px-3 py-2">{p.status}</td>
                  <td className="border px-3 py-2">{p.is_authorized ? "Yes" : "No"}</td>
                  <td className="border px-3 py-2">{p.category}</td>
                  <td className="border px-3 py-2">{new Date(p.created_at).toLocaleString()}</td>
                  <td className="border px-3 py-2">{new Date(p.updated_at).toLocaleString()}</td>
                  <td className="border px-3 py-2 flex space-x-2">
                    <button
                      className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      onClick={() => handleEdit(p)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
};

export default ProductsPage;
