"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { getAccessToken } from "@/lib/auth";
import { POSO_ENDPOINTS } from "@/lib/apiEndpoints";
// import { POSO_ENDPOINTS } from "../../";
// import { getAccessToken } from "@/lib/api";

interface OrderItem {
  id: string;
  product: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  status: string;
}

interface PurchaseOrderDetail {
  id: string;
  supplier: string;
  status: string;
  order_date: string;
  items: OrderItem[];
}

const PurchaseOrderDetailPage: React.FC = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<PurchaseOrderDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const token = getAccessToken();
        if (!token) throw new Error("No access token");

        const res = await axios.get("/api/proxy", {
          params: { endpoint: `${POSO_ENDPOINTS.PURCHASE_ORDERS}${id}/` },
          headers: { Authorization: `JWT ${token}` },
        });
        setOrder(res.data);
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.detail || err.message || "Failed to fetch order");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handleAddItem = async () => {
    if (!product || quantity <= 0 || unitPrice <= 0) return;
    setLoading(true);
    try {
      const token = getAccessToken();
      if (!token) throw new Error("No access token");

      const payload = {
        purchase_order: id,
        product,
        quantity,
        unit_price: unitPrice,
        total_price: quantity * unitPrice,
        status: "pending",
      };

      const res = await axios.post("/api/proxy", { endpoint: POSO_ENDPOINTS.PURCHASE_ORDER_ITEMS, payload }, { headers: { Authorization: `JWT ${token}` }});
      setOrder((prev) => prev ? { ...prev, items: [...prev.items, res.data] } : null);

      setProduct(""); setQuantity(1); setUnitPrice(0);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || err.message || "Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Purchase Order Detail</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!order && !loading && <p>Order not found</p>}

      {order && (
        <div className="w-full max-w-2xl bg-white shadow rounded-lg p-6 flex flex-col gap-4">
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Supplier:</strong> {order.supplier}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Order Date:</strong> {new Date(order.order_date).toLocaleString()}</p>

          <h2 className="text-xl font-semibold mt-4">Add Item</h2>
          <div className="flex flex-col gap-2">
            <input className="p-2 border rounded" placeholder="Product ID" value={product} onChange={e => setProduct(e.target.value)} />
            <input type="number" className="p-2 border rounded" placeholder="Quantity" value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
            <input type="number" className="p-2 border rounded" placeholder="Unit Price" value={unitPrice} onChange={e => setUnitPrice(Number(e.target.value))} />
            <button onClick={handleAddItem} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              {loading ? "Adding..." : "Add Item"}
            </button>
          </div>

          <h2 className="text-xl font-semibold mt-4">Items</h2>
          {order.items.length === 0 ? (
            <p>No items yet</p>
          ) : (
            <div className="flex flex-col gap-2">
              {order.items.map((item) => (
                <div key={item.id} className="p-2 border rounded flex justify-between">
                  <p>{item.product}</p>
                  <p>{item.quantity} × {item.unit_price} = {item.total_price}</p>
                  <p>{item.status}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default PurchaseOrderDetailPage;
