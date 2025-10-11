"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { POSO_ENDPOINTS } from "@/lib/apiEndpoints";
import { getAccessToken } from "@/lib/api";

interface PurchaseOrder {
  id: string;
  supplier: string;
  order_date: string;
  status: "pending" | "approved" | "completed";
  created_at: string;
  updated_at: string;
  items: any[];
}

const PurchaseOrders: React.FC = () => {
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [supplier, setSupplier] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const token = getAccessToken();
        if (!token) throw new Error("No access token");

        const res = await axios.get("/api/proxy", {
          params: { endpoint: POSO_ENDPOINTS.PURCHASE_ORDERS },
          headers: { Authorization: `JWT ${token}` },
        });
        setOrders(res.data);
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.detail || err.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleCreateOrder = async () => {
    if (!supplier) return;
    setLoading(true);
    try {
      const token = getAccessToken();
      if (!token) throw new Error("No access token");

      const payload = { supplier, status: "pending", order_date: new Date().toISOString() };
      const res = await axios.post("/api/proxy", { endpoint: POSO_ENDPOINTS.PURCHASE_ORDERS, payload }, { headers: { Authorization: `JWT ${token}` }});
      setOrders((prev) => [...prev, res.data]);
      setSupplier("");
      setShowForm(false);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || err.message || "Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Purchase Orders</h1>

      <button onClick={() => setShowForm(prev => !prev)} className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        {showForm ? "Close Form" : "Create Purchase Order"}
      </button>

      {showForm && (
        <div className="bg-white shadow rounded-lg p-6 w-96 mb-6 flex flex-col gap-2">
          <input
            className="p-2 border rounded"
            placeholder="Supplier ID"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
          />
          <button onClick={handleCreateOrder} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            {loading ? "Creating..." : "Create Order"}
          </button>
        </div>
      )}

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {orders.map((order) => (
          <div key={order.id} className="bg-white shadow rounded-lg p-4 w-80 flex flex-col gap-2">
            <h3 className="font-semibold">Order ID: {order.id}</h3>
            <p>Supplier: {order.supplier}</p>
            <p>Status: {order.status}</p>
            <p>Order Date: {new Date(order.order_date).toLocaleDateString()}</p>
            <p>Items: {order.items.length}</p>
            <a
              href={`/purchase-orders/${order.id}`}
              className="mt-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-center"
            >
              View / Add Items
            </a>
          </div>
        ))}
      </div>
    </main>
  );
};

export default PurchaseOrders;
