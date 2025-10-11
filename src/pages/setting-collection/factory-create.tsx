"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "@/lib/apiEndpoints";
import { getAccessToken } from "@/lib/api";
import { Factory, Company, City, AdminRegion } from "@/types";

const FactoryCreate: React.FC = () => {
  const [factories, setFactories] = useState<Factory[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [regions, setRegions] = useState<AdminRegion[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Form fields
  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    location: "",
    unique_location: "",
    capacity: 0,
    company: "",
    city: "",
    admin_region: "",
  });

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);
      try {
        const token = getAccessToken();
        if (!token) throw new Error("No access token found");

        const [factoriesRes, companiesRes, citiesRes, regionsRes] =
          await Promise.all([
            axios.get("/api/proxy", {
              params: { endpoint: API.FACTORIES },
              headers: { Authorization: `JWT ${token}` },
            }),
            axios.get("/api/proxy", {
              params: { endpoint: API.COMPANIES },
              headers: { Authorization: `JWT ${token}` },
            }),
            axios.get("/api/proxy", {
              params: { endpoint: API.CITIES },
              headers: { Authorization: `JWT ${token}` },
            }),
            axios.get("/api/proxy", {
              params: { endpoint: API.ADMIN_REGIONS },
              headers: { Authorization: `JWT ${token}` },
            }),
          ]);

        setFactories(factoriesRes.data);
        setCompanies(companiesRes.data);
        setCities(citiesRes.data);
        setRegions(regionsRes.data);
      } catch (err: any) {
        setError(err.response?.data?.detail || err.message || "Failed to fetch data");
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, []);

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Add or Update factory
  const handleSubmit = async () => {
    if (!form.name || !form.company || !form.city || !form.admin_region) return;
    setLoading(true);
    setError("");

    const payload = {
      name: form.name,
      description: form.description,
      location: form.location,
      unique_location: form.unique_location,
      capacity: form.capacity ? Number(form.capacity) : null,
      status: "active",
      company: form.company,
      city: form.city,
      admin_region: form.admin_region,
    };

    try {
      const token = getAccessToken();
      const endpoint = form.id
        ? `${API.FACTORIES}${form.id}/`
        : API.FACTORIES;

      const res = form.id
        ? await axios.put(
            "/api/proxy",
            { endpoint, payload },
            { headers: { Authorization: `JWT ${token}` } }
          )
        : await axios.post(
            "/api/proxy",
            { endpoint, payload },
            { headers: { Authorization: `JWT ${token}` } }
          );

      setFactories((prev) =>
        form.id ? prev.map((f) => (f.id === form.id ? res.data : f)) : [...prev, res.data]
      );

      // Reset form
      setForm({
        id: "",
        name: "",
        description: "",
        location: "",
        unique_location: "",
        capacity: 0,
        company: "",
        city: "",
        admin_region: "",
      });
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || "Failed to save factory");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (factory: Factory) => {
    setForm({
      id: factory.id,
      name: factory.name,
      description: factory.description || "",
      location: factory.location || "",
      unique_location: factory.unique_location || "",
      capacity: factory.capacity || 0,
      company: factory.company.id,
      city: factory.city.id,
      admin_region: factory.admin_region.id,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this factory?")) return;
    setLoading(true);
    try {
      const token = getAccessToken();
      await axios.delete("/api/proxy", {
        data: { endpoint: `${API.FACTORIES}${id}/` },
        headers: { Authorization: `JWT ${token}` },
      });
      setFactories((prev) => prev.filter((f) => f.id !== id));
    } catch (err: any) {
      alert(err.response?.data?.detail || err.message || "Failed to delete factory");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Manage Factories</h1>

      {/* Add / Edit Form */}
      <section className="p-4 mb-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">
          {form.id ? "Edit Factory" : "Add New Factory"}
        </h2>
        {error && <div className="mb-2 text-red-600">{error}</div>}

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Factory Name"
            value={form.name}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="unique_location"
            placeholder="Unique Location"
            value={form.unique_location}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="col-span-2 p-2 border rounded"
          />
          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            value={form.capacity}
            onChange={handleChange}
            className="p-2 border rounded"
          />

          {/* Dropdowns */}
          <select
            name="company"
            value={form.company}
            onChange={handleChange}
            className="p-2 border rounded"
          >
            <option value="">Select Company</option>
            {companies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            name="city"
            value={form.city}
            onChange={handleChange}
            className="p-2 border rounded"
          >
            <option value="">Select City</option>
            {cities.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            name="admin_region"
            value={form.admin_region}
            onChange={handleChange}
            className="p-2 border rounded"
          >
            <option value="">Select Region</option>
            {regions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {loading ? "Saving..." : form.id ? "Save Changes" : "Add Factory"}
          </button>
          {form.id && (
            <button
              onClick={() =>
                setForm({
                  id: "",
                  name: "",
                  description: "",
                  location: "",
                  unique_location: "",
                  capacity: 0,
                  company: "",
                  city: "",
                  admin_region: "",
                })
              }
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </section>

      {/* Factories Table */}
      <section className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Existing Factories</h2>
        {fetching ? (
          <p>Loading...</p>
        ) : factories.length === 0 ? (
          <p>No factories found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-200 text-left">
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">City</th>
                  <th className="px-4 py-2 border">Region</th>
                  <th className="px-4 py-2 border">Company</th>
                  <th className="px-4 py-2 border">Capacity</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {factories.map((f) => (
                  <tr key={f.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{f.id}</td>
                    <td className="px-4 py-2 border">{f.name}</td>
                    <td className="px-4 py-2 border">{f.city?.name}</td>
                    <td className="px-4 py-2 border">{f.admin_region?.name}</td>
                    <td className="px-4 py-2 border">{f.company?.name}</td>
                    <td className="px-4 py-2 border">{f.capacity ?? "—"}</td>
                    <td className="px-4 py-2 border">
                      <button
                        className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2"
                        onClick={() => handleEdit(f)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => handleDelete(f.id)}
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

export default FactoryCreate;
