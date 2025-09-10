// pages/company-create.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "@/lib/apiEndpoints";
import { getAccessToken } from "@/lib/api";

type Company = {
  id: number;
  name: string;
  description: string;
  customer: number;
  logo_url?: string;
  company_status: string;
  created_at: string;
  updated_at: string;
};

const CompanyCreate: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Fetch existing companies
  useEffect(() => {
    const fetchCompanies = async () => {
      setFetching(true);
      try {
        const token = getAccessToken();
        if (!token) throw new Error("No access token found");

        const res = await axios.get("/api/proxy", {
          params: { endpoint: API.COMPANIES },
          headers: { Authorization: `JWT ${token}` },
        });

        setCompanies(res.data);
      } catch (err: any) {
        console.error("Error fetching companies:", err);
        setError(err.response?.data?.detail || err.message || "Failed to fetch companies");
      } finally {
        setFetching(false);
      }
    };
    fetchCompanies();
  }, []);

  // Add new company
  const handleAddCompany = async () => {
    if (!name) return;
    setLoading(true);
    setError("");

    const payload = {
      name,
      description,
      customer: 1, // default customer
      logo_url: "",
      company_status: "ACTIVE",
      created_at: new Date().toISOString(), // default current datetime
    };

    try {
      const token = getAccessToken();
      if (!token) throw new Error("No access token found");

      const res = await axios.post(
        "/api/proxy",
        { endpoint: API.COMPANIES, payload },
        { headers: { Authorization: `JWT ${token}` } }
      );

      setCompanies((prev) => [...prev, res.data]);
      setName("");
      setDescription("");
    } catch (err: any) {
      console.error("Error adding company:", err);
      setError(err.response?.data?.detail || err.message || "Failed to add company");
    } finally {
      setLoading(false);
    }
  };

  // Start editing
  const startEdit = (company: Company) => {
    setEditingId(company.id);
    setEditName(company.name);
    setEditDescription(company.description);
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditDescription("");
  };

  // Save edited company
  const saveEdit = async (id: number) => {
    if (!editName) return;
    setLoading(true);
    setError("");

    const payload = {
      name: editName,
      description: editDescription,
      customer: 1, // default
      logo_url: "",
      company_status: "ACTIVE",
      created_at: new Date().toISOString(),
    };

    try {
      const token = getAccessToken();
      if (!token) throw new Error("No access token found");

      const res = await axios.put(
        "/api/proxy",
        { endpoint: `${API.COMPANIES}${id}/`, payload },
        { headers: { Authorization: `JWT ${token}` } }
      );

      setCompanies((prev) => prev.map((c) => (c.id === id ? res.data : c)));
      cancelEdit();
    } catch (err: any) {
      console.error("Error saving company:", err);
      setError(err.response?.data?.detail || err.message || "Failed to save company");
    } finally {
      setLoading(false);
    }
  };

  // Delete company
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this company?")) return;
    setLoading(true);
    try {
      const token = getAccessToken();
      if (!token) throw new Error("No access token found");

      await axios.delete("/api/proxy", {
        data: { endpoint: `${API.COMPANIES}${id}/` },
        headers: { Authorization: `JWT ${token}` },
      });

      setCompanies((prev) => prev.filter((c) => c.id !== id));
    } catch (err: any) {
      console.error("Error deleting company:", err);
      alert(err.response?.data?.detail || err.message || "Failed to delete company");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Manage Companies</h1>

      {/* Add / Edit Company Form */}
      <section className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Company" : "Add New Company"}
        </h2>
        {error && <div className="mb-2 text-red-600">{error}</div>}
        <div className="flex flex-col space-y-3">
          <input
            type="text"
            placeholder="Company Name"
            className="p-2 border rounded"
            value={editingId ? editName : name}
            onChange={(e) =>
              editingId ? setEditName(e.target.value) : setName(e.target.value)
            }
            disabled={loading}
          />
          <textarea
            placeholder="Description"
            className="p-2 border rounded"
            value={editingId ? editDescription : description}
            onChange={(e) =>
              editingId ? setEditDescription(e.target.value) : setDescription(e.target.value)
            }
            disabled={loading}
          />
          {!editingId && (
            <button
              className={`px-4 py-2 text-white rounded flex items-center justify-center gap-2 ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
              onClick={handleAddCompany}
              disabled={loading}
            >
              {loading && (
                <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              {loading ? "Adding..." : "Add Company"}
            </button>
          )}
          {editingId && (
            <div className="flex space-x-2">
              <button
                className={`px-4 py-2 text-white rounded flex items-center justify-center gap-2 ${
                  loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
                }`}
                onClick={() => saveEdit(editingId)}
                disabled={loading}
              >
                {loading && (
                  <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={cancelEdit}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Existing Companies Table */}
      <section className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Existing Companies</h2>

        {fetching ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : companies.length === 0 ? (
          <p>No companies yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Description</th>
                  <th className="px-4 py-2 border">Customer</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Created</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{c.id}</td>
                    <td className="px-4 py-2 border">{c.name}</td>
                    <td className="px-4 py-2 border">{c.description}</td>
                    <td className="px-4 py-2 border">{c.customer}</td>
                    <td className="px-4 py-2 border">{c.company_status}</td>
                    <td className="px-4 py-2 border">{new Date(c.created_at).toLocaleString()}</td>
                    <td className="px-4 py-2 border space-x-2">
                      <button
                        className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        onClick={() => startEdit(c)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => handleDelete(c.id)}
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

export default CompanyCreate;
