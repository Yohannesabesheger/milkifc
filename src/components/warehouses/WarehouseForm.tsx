"use client";

import { useState, useEffect } from "react";
import { Warehouse, Factory } from "@/types";
import axios from "axios";
import { API } from "@/lib/apiEndpoints";
import { getAccessToken } from "@/lib/api";

interface WarehouseFormProps {
  onSubmit: (data: Warehouse) => void;
  onCancel?: () => void;
  initialData?: Warehouse;
}

export default function WarehouseForm({ onSubmit, onCancel, initialData }: WarehouseFormProps) {
  const [factories, setFactories] = useState<Factory[]>([]);
  const [warehouseData, setWarehouseData] = useState<Warehouse>({
    id: initialData?.id || "",
    factory: initialData?.factory || null,
    name: initialData?.name || "",
    description: initialData?.description || "",
    location: initialData?.location || "",
    capacity: initialData?.capacity || null,
    status: initialData?.status || "active",
    created_at: initialData?.created_at || new Date().toISOString(),
    updated_at: initialData?.updated_at || new Date().toISOString(),
  });

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
    fetchFactories();
  }, []);

  const handleChange = (key: keyof Warehouse, value: any) => {
    setWarehouseData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!warehouseData.factory) {
      alert("Factory is required");
      return;
    }
    onSubmit(warehouseData);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Factory */}
      <div>
        <label className="block font-medium mb-1">Factory *</label>
        <select
          value={warehouseData.factory || ""}
          onChange={(e) => handleChange("factory", e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Factory</option>
          {factories.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </select>
      </div>

      {/* Name */}
      <div>
        <label className="block font-medium mb-1">Name</label>
        <input
          type="text"
          value={warehouseData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block font-medium mb-1">Description</label>
        <input
          type="text"
          value={warehouseData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Location */}
      <div>
        <label className="block font-medium mb-1">Location</label>
        <input
          type="text"
          value={warehouseData.location}
          onChange={(e) => handleChange("location", e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Capacity */}
      <div>
        <label className="block font-medium mb-1">Capacity</label>
        <input
          type="number"
          value={warehouseData.capacity || ""}
          onChange={(e) => handleChange("capacity", Number(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Status */}
      <div>
        <label className="block font-medium mb-1">Status</label>
        <select
          value={warehouseData.status || "active"}
          onChange={(e) => handleChange("status", e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="lg:col-span-2 flex gap-2 mt-2 justify-end">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {initialData ? "Save" : "Add"}
        </button>
        {onCancel && (
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
