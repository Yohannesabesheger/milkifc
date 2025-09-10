// pages/warehouse-create.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "@/lib/apiEndpoints";
import { getAccessToken } from "@/lib/api";
import { RefreshCcw } from "lucide-react";
import { Warehouse, Factory } from "@/types";



const WarehouseCreate: React.FC = () => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [factories, setFactories] = useState<Factory[]>([]);
  const [capacity, setCapacity] = useState(0);
  const [factory, setFactory] = useState<number>(1);
  const [status, setStatus] = useState("ACTIVE");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // edit fields
  const [editCapacity, setEditCapacity] = useState(0);
  const [editFactory, setEditFactory] = useState<number>(1);
  const [editStatus, setEditStatus] = useState("ACTIVE");

  // Fetch warehouses
  const fetchWarehouses = async () => {
    setFetching(true);
    try {
      const token = getAccessToken();
      if (!token) throw new Error("No access token found");

      const res = await axios.get("/api/proxy", {
        params: { endpoint: API.WAREHOUSES },
        headers: { Authorization: `JWT ${token}` },
      });

      setWarehouses(res.data);
    } catch (err: any) {
      console.error("Error fetching warehouses:", err);
      setError(err.response?.data?.detail || err.message || "Failed to fetch warehouses");
    } finally {
      setFetching(false);
    }
  };

  // Fetch factories
  const fetchFactories = async () => {
    try {
      const token = getAccessToken();
      const res = await axios.get("/api/proxy", {
        params: { endpoint: API.FACTORIES },
        headers: { Authorization: `JWT ${token}` },
      });
      setFactories(res.data);
    } catch (err) {
      console.error("Error fetching factories:", err);
    }
  };

  useEffect(() => {
    fetchWarehouses();
    fetchFactories();
  }, []);

  // Add new warehouse
  const handleAddWarehouse = async () => {
    if (!capacity) return;
    setLoading(true);
    setError("");

    const payload = {
      capacity,
      status,
      is_authorized: true,
      authorization_time: new Date().toISOString(),
      created_at: new Date().toISOString(),
      authorized_by: 1,
      factory,
    };

    try {
      const token = getAccessToken();
      const res = await axios.post(
        "/api/proxy",
        { endpoint: API.WAREHOUSES, payload },
        { headers: { Authorization: `JWT ${token}` } }
      );

      setWarehouses((prev) => [...prev, res.data]);
      setCapacity(0);
      setStatus("ACTIVE");
      setFactory(1);
    } catch (err: any) {
      console.error("Error adding warehouse:", err);
      setError(err.response?.data?.detail || err.message || "Failed to add warehouse");
    } finally {
      setLoading(false);
    }
  };

  // Start editing
  const startEdit = (warehouse: Warehouse) => {
    setEditingId(warehouse.id);
    setEditCapacity(warehouse.capacity);
    setEditFactory(warehouse.factory);
    setEditStatus(warehouse.status);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditCapacity(0);
    setEditFactory(1);
    setEditStatus("ACTIVE");
  };

  // Save edit
  const saveEdit = async (id: number) => {
    setLoading(true);
    setError("");

    const payload = {
      capacity: editCapacity,
      status: editStatus,
      is_authorized: true,
      authorization_time: new Date().toISOString(),
      authorized_by: 1,
      factory: editFactory,
    };

    try {
      const token = getAccessToken();
      const res = await axios.put(
        "/api/proxy",
        { endpoint: `${API.WAREHOUSES}${id}/`, payload },
        { headers: { Authorization: `JWT ${token}` } }
      );

      setWarehouses((prev) => prev.map((w) => (w.id === id ? res.data : w)));
      cancelEdit();
    } catch (err: any) {
      console.error("Error saving warehouse:", err);
      setError(err.response?.data?.detail || err.message || "Failed to save warehouse");
    } finally {
      setLoading(false);
    }
  };

  // Delete warehouse
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this warehouse?")) return;
    setLoading(true);
    try {
      const token = getAccessToken();
      await axios.delete("/api/proxy", {
        data: { endpoint: `${API.WAREHOUSES}${id}/` },
        headers: { Authorization: `JWT ${token}` },
      });

      setWarehouses((prev) => prev.filter((w) => w.id !== id));
    } catch (err: any) {
      console.error("Error deleting warehouse:", err);
      alert(err.response?.data?.detail || err.message || "Failed to delete warehouse");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Manage Warehouses</h1>
        <button
          className="flex items-center px-3 py-1 border rounded hover:bg-gray-100"
          onClick={fetchWarehouses}
        >
          <RefreshCcw className="w-4 h-4 mr-1" /> Refresh
        </button>
      </div>

      {/* Add/Edit Form */}
      <section className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Warehouse" : "Add New Warehouse"}
        </h2>
        {error && <div className="mb-2 text-red-600">{error}</div>}

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
  <label className="mb-1 font-medium" htmlFor={editingId ? "editCapacity" : "capacity"}>
    Production Capacity(24/hr)
  </label>
          <input
            type="number"
            placeholder="Capacity"
            className="p-2 border rounded"
            value={editingId ? editCapacity : capacity}
            onChange={(e) =>
              editingId
                ? setEditCapacity(Number(e.target.value))
                : setCapacity(Number(e.target.value))
            }
          />
          </div>

          <select
            className="p-2 border rounded"
            value={editingId ? editFactory : factory}
            onChange={(e) =>
              editingId
                ? setEditFactory(Number(e.target.value))
                : setFactory(Number(e.target.value))
            }
          >
            {factories.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>

          <select
            className="p-2 border rounded"
            value={editingId ? editStatus : status}
            onChange={(e) =>
              editingId ? setEditStatus(e.target.value) : setStatus(e.target.value)
            }
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
        </div>

        <div className="mt-4 flex gap-2">
          {!editingId ? (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={handleAddWarehouse}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Warehouse"}
            </button>
          ) : (
            <>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => saveEdit(editingId)}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </section>

      {/* Warehouses Table */}
      <section className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Existing Warehouses</h2>

        {fetching ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : warehouses.length === 0 ? (
          <p>No warehouses yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Capacity</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Factory</th>
                  <th className="px-4 py-2 border">Created</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {warehouses.map((w) => (
                  <tr key={w.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{w.id}</td>
                    <td className="px-4 py-2 border">{w.capacity}</td>
                    <td className="px-4 py-2 border">{w.status}</td>
                    <td className="px-4 py-2 border">
                      {factories.find((f) => f.id === w.factory)?.name || `Factory #${w.factory}`}
                    </td>
                    <td className="px-4 py-2 border">{new Date(w.created_at).toLocaleString()}</td>
                    <td className="px-4 py-2 border space-x-2">
                      <button
                        className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        onClick={() => startEdit(w)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => handleDelete(w.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
};

export default WarehouseCreate;
