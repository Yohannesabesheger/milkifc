"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "@/types";
import { getAccessToken } from "@/lib/api";
import { INVENTORY_ENDPOINTS, CORE_ENDPOINTS } from "@/lib/apiEndpoints";

interface Package {
  id: string;
  name: string;
}

interface Factory {
  id: string;
  name: string;
}

interface ProductFormProps {
  onSubmit: (data: Product) => void;
  onCancel?: () => void;
  initialData?: Product;
}

export default function ProductForm({ onSubmit, onCancel, initialData }: ProductFormProps) {
  const token = getAccessToken();

  const [productData, setProductData] = useState<Product>({
    id: initialData?.id || "",
    name: initialData?.name || "",
    description: initialData?.description || "",
    package_name: initialData?.package_name || "",
    unit_of_measure: initialData?.unit_of_measure || "KG",
    unit_price: initialData?.unit_price || 0,
    package_size: initialData?.package_size || "",
    factory: initialData?.factory || "",
    status: initialData?.status || "active",
    created_at: initialData?.created_at || "",
    updated_at: initialData?.updated_at || "",
  });

  const [packages, setPackages] = useState<Package[]>([]);
  const [factories, setFactories] = useState<Factory[]>([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get("/api/proxy", {
          params: { endpoint: INVENTORY_ENDPOINTS.PRODUCT_PACKAGES },
          headers: { Authorization: `JWT ${token}` },
        });
        setPackages(res.data);
      } catch (err) {
        console.error("Error fetching packages:", err);
      }
    };

    const fetchFactories = async () => {
      try {
        const res = await axios.get("/api/proxy", {
          params: { endpoint: CORE_ENDPOINTS.COMPANIES },
          headers: { Authorization: `JWT ${token}` },
        });
        setFactories(res.data);
      } catch (err) {
        console.error("Error fetching factories:", err);
      }
    };

    if (token) {
      fetchPackages();
      fetchFactories();
    }
  }, [token]);

  const handleChange = (key: keyof Product, value: any) => {
    setProductData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!productData.name || !productData.package_name || !productData.factory) {
      alert("Name, Package, and Factory are required.");
      return;
    }
    onSubmit(productData);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto space-y-4">
      <h2 className=" font-semibold border-b pb-2 mb-4">Product Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input
            type="text"
            value={productData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="p-2 border rounded w-full text-sm"
          />
        </div>

        {/* Package */}
        <div>
          <label className="block text-sm font-medium mb-1">Package *</label>
          <select
            value={productData.package_name}
            onChange={(e) => handleChange("package_name", e.target.value)}
            className="p-2 border rounded w-full text-sm"
          >
            <option value="">Select Package</option>
            {packages.map((pkg) => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.name}
              </option>
            ))}
          </select>
        </div>

        {/* Factory */}
        <div>
          <label className="block text-sm font-medium mb-1">Factory *</label>
          <select
            value={productData.factory}
            onChange={(e) => handleChange("factory", e.target.value)}
            className="p-2 border rounded w-full text-sm"
          >
            <option value="">Select Factory</option>
            {factories.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </div>

        {/* Unit of Measure */}
        <div>
          <label className="block text-sm font-medium mb-1">Unit of Measure</label>
          <select
            value={productData.unit_of_measure || "KG"}
            onChange={(e) => handleChange("unit_of_measure", e.target.value)}
            className="p-2 border rounded w-full text-sm"
          >
            <option value="KG">KG</option>
            <option value="pack">pack</option>
          </select>
        </div>

        {/* Unit Price */}
        <div>
          <label className="block text-sm font-medium mb-1">Unit Price</label>
          <input
            type="number"
            value={productData.unit_price || ""}
            onChange={(e) => handleChange("unit_price", parseFloat(e.target.value))}
            className="p-2 border rounded w-full text-sm"
          />
        </div>

        {/* Package Size */}
        <div>
          <label className="block text-sm font-medium mb-1">Package Size</label>
          <input
            type="text"
            value={productData.package_size || ""}
            onChange={(e) => handleChange("package_size", e.target.value)}
            className="p-2 border rounded w-full text-sm"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            value={productData.status || "active"}
            onChange={(e) => handleChange("status", e.target.value)}
            className="p-2 border rounded w-full text-sm"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Description</label>
          <input
            type="text"
            value={productData.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
            className="p-2 border rounded w-full text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        {onCancel && (
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm"
          >
            Cancel
          </button>
        )}
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
        >
          {initialData ? "Save" : "Add"}
        </button>
      </div>
    </div>
  );
}
