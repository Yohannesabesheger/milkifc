"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "@/lib/apiEndpoints";
import { getAccessToken } from "@/lib/api";
import { Company } from "@/types";

const CompanyCreate: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form fields for adding
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");

  // Form editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFields, setEditFields] = useState({
    name: "",
    description: "",
    logo_url: "",
    status: "active" as "active" | "inactive",
  });

  const isWarehouseImplementer = true;

  // Fetch companies
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
        console.error(err);
        setError(err.response?.data?.detail || err.message || "Failed to fetch companies");
      } finally {
        setFetching(false);
      }
    };
    fetchCompanies();
  }, []);

  const handleAddCompany = async () => {
    if (!name) return;
    setLoading(true);
    setError("");

    const payload = {
      name,
      description,
      logo_url: logoUrl,
      status,
      created_at: new Date().toISOString(),
    };

    try {
      const token = getAccessToken();
      if (!token) throw new Error("No access token found");

      const res = await axios.post("/api/proxy", { endpoint: API.COMPANIES, payload }, { headers: { Authorization: `JWT ${token}` }});
      setCompanies((prev) => [...prev, res.data]);
      setName(""); setDescription(""); setLogoUrl(""); setStatus("active");
      setShowForm(false);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || err.message || "Failed to add company");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (company: Company) => {
    setEditingId(company.id);
    setEditFields({
      name: company.name,
      description: company.description,
      logo_url: company.logo_url || "",
      status: (company.status || "active").toLowerCase() as "active" | "inactive",
    });
  };

  const saveEdit = async () => {
    if (!editingId) return;
    setLoading(true);
    setError("");

    const payload = { ...editFields };

    try {
      const token = getAccessToken();
      if (!token) throw new Error("No access token found");

      const res = await axios.put("/api/proxy", {
        endpoint: `${API.COMPANIES}${editingId}/`,
        payload,
      }, { headers: { Authorization: `JWT ${token}` }});

      setCompanies((prev) => prev.map((c) => (c.id === editingId ? res.data : c)));
      setEditingId(null);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || err.message || "Failed to save company");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this company?")) return;
    setLoading(true);

    try {
      const token = getAccessToken();
      if (!token) throw new Error("No access token found");

      await axios.delete("/api/proxy", { data: { endpoint: `${API.COMPANIES}${id}/` }, headers: { Authorization: `JWT ${token}` }});
      setCompanies((prev) => prev.filter((c) => c.id !== id));
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.detail || err.message || "Failed to delete company");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Companies</h1>
      {error && <div className="mb-4 text-red-600">{error}</div>}

      {/* Show form toggle for warehouse implementers */}
      {isWarehouseImplementer && (
        <button onClick={() => setShowForm(prev => !prev)} className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          {showForm ? "Close Form" : "Add Company"}
        </button>
      )}

      {/* Add / Edit Form */}
      {showForm && (
        <section className="bg-white shadow rounded-lg p-6 w-96 mb-6">
          <h2 className="text-xl font-semibold mb-4">{editingId ? "Edit Company" : "Add New Company"}</h2>
          <input className="w-full p-2 border rounded mb-2" placeholder="Name" value={editingId ? editFields.name : name} onChange={e => editingId ? setEditFields(prev => ({ ...prev, name: e.target.value })) : setName(e.target.value)} disabled={loading}/>
          <input className="w-full p-2 border rounded mb-2" placeholder="Logo URL" value={editingId ? editFields.logo_url : logoUrl} onChange={e => editingId ? setEditFields(prev => ({ ...prev, logo_url: e.target.value })) : setLogoUrl(e.target.value)} disabled={loading}/>
          <textarea className="w-full p-2 border rounded mb-2" placeholder="Description" value={editingId ? editFields.description : description} onChange={e => editingId ? setEditFields(prev => ({ ...prev, description: e.target.value })) : setDescription(e.target.value)} disabled={loading}/>
          <select className="w-full p-2 border rounded mb-2" value={editingId ? editFields.status : status} onChange={e => editingId ? setEditFields(prev => ({ ...prev, status: e.target.value as "active" | "inactive" })) : setStatus(e.target.value as "active" | "inactive")}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button onClick={editingId ? saveEdit : handleAddCompany} disabled={loading} className={`w-full px-4 py-2 text-white rounded ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}>
            {loading ? (editingId ? "Saving..." : "Adding...") : (editingId ? "Save" : "Add Company")}
          </button>
        </section>
      )}

      {/* Company Cards */}
      {fetching ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : companies.length === 0 ? (
        <p className="text-gray-600">No companies available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {companies.map((c) => (
            <div key={c.id} className="bg-white rounded-lg shadow p-6 w-80 flex flex-col justify-between">
              {editingId === c.id ? (
                <div className="flex flex-col space-y-2">
                  <input className="p-2 border rounded" value={editFields.name} onChange={e => setEditFields(prev => ({ ...prev, name: e.target.value }))} disabled={loading}/>
                  <input className="p-2 border rounded" value={editFields.logo_url} onChange={e => setEditFields(prev => ({ ...prev, logo_url: e.target.value }))} disabled={loading}/>
                  <textarea className="p-2 border rounded" value={editFields.description} onChange={e => setEditFields(prev => ({ ...prev, description: e.target.value }))} disabled={loading}/>
                  <select className="p-2 border rounded" value={editFields.status} onChange={e => setEditFields(prev => ({ ...prev, status: e.target.value as "active" | "inactive" }))}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <div className="flex gap-2 mt-2">
                    <button onClick={saveEdit} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Save</button>
                    <button onClick={() => setEditingId(null)} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <h3 className="text-xl font-semibold mb-2">{c.name}</h3>
                  {c.logo_url ? (
                    <img src={c.logo_url} alt={c.name} className="w-full h-32 object-contain mb-2 rounded"/>
                  ) : (
                    <div className="w-full h-32 bg-gray-100 flex items-center justify-center mb-2 rounded text-gray-400">No Logo</div>
                  )}
                  <p className="text-gray-600 mb-1">{c.description}</p>
                  <p className="text-sm text-gray-500">Status: {c.status}</p>
                  <p className="text-sm text-gray-500">Created: {new Date(c.created_at).toLocaleString()}</p>
                  {isWarehouseImplementer && (
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => startEdit(c)} className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</button>
                      <button onClick={() => handleDelete(c.id)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default CompanyCreate;
