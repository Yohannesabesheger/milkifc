// pages/factory-create.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "@/lib/apiEndpoints";
import { getAccessToken } from "@/lib/api";
import { Company,Factory } from "@/types";



const FactoryCreate: React.FC = () => {
  const [factories, setFactories] = useState<Factory[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [locationName, setLocationName] = useState("");
  const [city, setCity] = useState("");
  const [adminRegion, setAdminRegion] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [company, setCompany] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // edit fields
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editLocationName, setEditLocationName] = useState("");
  const [editCity, setEditCity] = useState("");
  const [editAdminRegion, setEditAdminRegion] = useState("");
  const [editCapacity, setEditCapacity] = useState(0);
  const [editCompany, setEditCompany] = useState<number>(1);

  // Fetch factories & companies
  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);
      try {
        const token = getAccessToken();
        if (!token) throw new Error("No access token found");

        const [factoriesRes, companiesRes] = await Promise.all([
          axios.get("/api/proxy", {
            params: { endpoint: API.FACTORIES },
            headers: { Authorization: `JWT ${token}` },
          }),
          axios.get("/api/proxy", {
            params: { endpoint: API.COMPANIES },
            headers: { Authorization: `JWT ${token}` },
          }),
        ]);

        setFactories(factoriesRes.data);
        setCompanies(companiesRes.data);
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.response?.data?.detail || err.message || "Failed to fetch data");
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, []);

  // Add new factory
  const handleAddFactory = async () => {
    if (!name) return;
    setLoading(true);
    setError("");

    const payload = {
      name,
      description,
      location_name: locationName,
      city,
      admin_region: adminRegion,
      latitude_point: "0",
      longitude_point: "0",
      is_operational: true,
      production_capacity: capacity,
      is_authorized: true,
      authorization_time: new Date().toISOString(),
      created_at: new Date().toISOString(),
      inputer: 1,
      company,
    };

    try {
      const token = getAccessToken();
      const res = await axios.post(
        "/api/proxy",
        { endpoint: API.FACTORIES, payload },
        { headers: { Authorization: `JWT ${token}` } }
      );

      setFactories((prev) => [...prev, res.data]);
      setName("");
      setDescription("");
      setLocationName("");
      setCity("");
      setAdminRegion("");
      setCapacity(0);
      setCompany(1);
    } catch (err: any) {
      console.error("Error adding factory:", err);
      setError(err.response?.data?.detail || err.message || "Failed to add factory");
    } finally {
      setLoading(false);
    }
  };

  // Start editing
  const startEdit = (factory: Factory) => {
    setEditingId(factory.id);
    setEditName(factory.name);
    setEditDescription(factory.description);
    setEditLocationName(factory.location_name);
    setEditCity(factory.city);
    setEditAdminRegion(factory.admin_region);
    setEditCapacity(factory.production_capacity);
    setEditCompany(factory.company);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditDescription("");
    setEditLocationName("");
    setEditCity("");
    setEditAdminRegion("");
    setEditCapacity(0);
    setEditCompany(1);
  };

  // Save edited factory
  const saveEdit = async (id: number) => {
    if (!editName) return;
    setLoading(true);
    setError("");

    const payload = {
      name: editName,
      description: editDescription,
      location_name: editLocationName,
      city: editCity,
      admin_region: editAdminRegion,
      latitude_point: "0",
      longitude_point: "0",
      is_operational: true,
      production_capacity: editCapacity,
      is_authorized: true,
      authorization_time: new Date().toISOString(),
      created_at: new Date().toISOString(),
      inputer: 1,
      company: editCompany,
    };

    try {
      const token = getAccessToken();
      const res = await axios.put(
        "/api/proxy",
        { endpoint: `${API.FACTORIES}${id}/`, payload },
        { headers: { Authorization: `JWT ${token}` } }
      );

      setFactories((prev) => prev.map((f) => (f.id === id ? res.data : f)));
      cancelEdit();
    } catch (err: any) {
      console.error("Error saving factory:", err);
      setError(err.response?.data?.detail || err.message || "Failed to save factory");
    } finally {
      setLoading(false);
    }
  };

  // Delete factory
  const handleDelete = async (id: number) => {
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
      console.error("Error deleting factory:", err);
      alert(err.response?.data?.detail || err.message || "Failed to delete factory");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Manage Factories</h1>

      {/* Add/Edit Form */}
      <section className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Factory" : "Add New Factory"}
        </h2>
        {error && <div className="mb-2 text-red-600">{error}</div>}

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Factory Name"
            className="p-2 border rounded"
            value={editingId ? editName : name}
            onChange={(e) =>
              editingId ? setEditName(e.target.value) : setName(e.target.value)
            }
          />
          <input
            type="text"
            placeholder="City"
            className="p-2 border rounded"
            value={editingId ? editCity : city}
            onChange={(e) =>
              editingId ? setEditCity(e.target.value) : setCity(e.target.value)
            }
          />
          <input
            type="text"
            placeholder="Admin Region"
            className="p-2 border rounded"
            value={editingId ? editAdminRegion : adminRegion}
            onChange={(e) =>
              editingId
                ? setEditAdminRegion(e.target.value)
                : setAdminRegion(e.target.value)
            }
          />
          <input
            type="text"
            placeholder="Location Name"
            className="p-2 border rounded"
            value={editingId ? editLocationName : locationName}
            onChange={(e) =>
              editingId
                ? setEditLocationName(e.target.value)
                : setLocationName(e.target.value)
            }
          />
          <textarea
            placeholder="Description"
            className="col-span-2 p-2 border rounded"
            value={editingId ? editDescription : description}
            onChange={(e) =>
              editingId
                ? setEditDescription(e.target.value)
                : setDescription(e.target.value)
            }
          />
         
         {/* Production Capacity */}
<div className="flex flex-col">
  <label className="mb-1 font-medium" htmlFor={editingId ? "editCapacity" : "capacity"}>
    Production Capacity(24/hr)
  </label>
  <input
    id={editingId ? "editCapacity" : "capacity"}
    type="number"
    inputMode="numeric"
    pattern="[0-9]*"
    className="p-2 border rounded"
    value={editingId ? editCapacity : capacity}
    onChange={(e) =>
      editingId
        ? setEditCapacity(Number(e.target.value))
        : setCapacity(Number(e.target.value))
    }
    // Remove spinner arrows in most browsers
    style={{ MozAppearance: "textfield" }}
  />
</div>

  

          {/* Company dropdown */}
          <select
            className="p-2 border rounded"
            value={editingId ? editCompany : company}
            onChange={(e) =>
              editingId
                ? setEditCompany(Number(e.target.value))
                : setCompany(Number(e.target.value))
            }
          >
            {companies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex gap-2">
          {!editingId ? (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={handleAddFactory}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Factory"}
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

      {/* Existing Factories Table */}
      <section className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Existing Factories</h2>

        {fetching ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : factories.length === 0 ? (
          <p>No factories yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">City</th>
                  <th className="px-4 py-2 border">Region</th>
                  <th className="px-4 py-2 border">Company</th>
                  <th className="px-4 py-2 border">Capacity</th>
                  <th className="px-4 py-2 border">Created</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {factories.map((f) => (
                  <tr key={f.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{f.id}</td>
                    <td className="px-4 py-2 border">{f.name}</td>
                    <td className="px-4 py-2 border">{f.city}</td>
                    <td className="px-4 py-2 border">{f.admin_region}</td>
                    <td className="px-4 py-2 border">
                      {companies.find((c) => c.id === f.company)?.name ||
                        `Company #${f.company}`}
                    </td>
                    <td className="px-4 py-2 border">{f.production_capacity}</td>
                    <td className="px-4 py-2 border">
                      {new Date(f.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 border space-x-2">
                      <button
                        className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        onClick={() => startEdit(f)}
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
