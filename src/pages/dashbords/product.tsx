import React, { useEffect, useState } from "react";
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

const ProductsDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = getAccessToken();

  useEffect(() => {
    if (!token) return;
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/proxy", {
          params: { endpoint: API.PRODUCTS },
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
    fetchProducts();
  }, [token]);

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Products Dashboard</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Authorized</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-3">{p.code}</td>
                  <td className="px-6 py-3 font-semibold">{p.name}</td>
                  <td className="px-6 py-3">{p.description}</td>
                  <td className="px-6 py-3">{p.category}</td>
                  <td className="px-6 py-3">{p.unit_of_measure}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        p.status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-3">{p.is_authorized ? "Yes" : "No"}</td>
                  <td className="px-6 py-3">{new Date(p.created_at).toLocaleString()}</td>
                  <td className="px-6 py-3">{new Date(p.updated_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};

export default ProductsDashboard;
