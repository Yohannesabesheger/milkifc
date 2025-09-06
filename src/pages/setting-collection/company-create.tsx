// pages/company-create.tsx
import React, { useState } from "react";

type Company = {
  id: number;
  name: string;
  description: string;
};

const CompanyCreate: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleAddCompany = () => {
    if (!name) return;
    const newCompany = { id: Date.now(), name, description };
    setCompanies([...companies, newCompany]);
    setName("");
    setDescription("");
  };

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Create Company</h1>

      <section className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Add New Company</h2>
        <div className="flex flex-col space-y-3">
          <input
            type="text"
            placeholder="Company Name"
            className="p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleAddCompany}
          >
            Add Company
          </button>
        </div>
      </section>

      <section className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Existing Companies</h2>
        {companies.length === 0 ? (
          <p>No companies yet.</p>
        ) : (
          <ul className="space-y-2">
            {companies.map((c) => (
              <li key={c.id} className="p-2 border rounded">
                <strong>{c.name}</strong>: {c.description}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default CompanyCreate;
