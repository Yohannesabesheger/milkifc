// pages/inventory-dashboard.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "@/lib/api";
import { API } from "@/lib/apiEndpoints";
import { Inventory } from "@/types";

const InventoryDashboard: React.FC = () => {
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = getAccessToken();

  useEffect(() => {
    if (!token) return;
    const fetchInventory = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/proxy", {
          params: { endpoint: API.INVENTORY },
          headers: { Authorization: `JWT ${token}` },
        });
        setInventory(res.data);
      } catch (err: any) {
        console.error("Error fetching inventory:", err);
        setError("Failed to fetch inventory data");
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, [token]);

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Inventory List</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading ? (
        <p>Loading inventory...</p>
      ) : inventory.length === 0 ? (
        <p>No inventory Records found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Stock Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Unit Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Locked
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Min Threshold
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Total Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Risk
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {inventory.map((item) => {
                const isRisk = item.quantity < item.minimum_threshold;
                return (
                  <tr
                    key={item.id}
                    className={`transition ${
                      isRisk ? "bg-red-50 hover:bg-red-100" : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-3 text-sm text-gray-700">
                      <span className="font-semibold text-gray-800">{item.id}</span>
                      <br />
                      {item.product} <br /> {item.warehouse}
                    </td>
                    <td className="px-6 py-3">{item.quantity}</td>
                    <td className="px-6 py-3">{item.unit_price.toFixed(2)}</td>
                    <td className="px-6 py-3">{item.locked_amount}</td>
                    <td className="px-6 py-3">{item.minimum_threshold}</td>
                    <td className="px-6 py-3">
                      {(item.unit_price * item.quantity).toFixed(2)}
                    </td>
                    <td className="px-6 py-3">
                      {new Date(item.last_updated).toLocaleString()}
                    </td>
                    <td className="px-6 py-3">
                      {isRisk ? (
                        <span className="px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">
                          Low Stock
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                          OK
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};

export default InventoryDashboard;
