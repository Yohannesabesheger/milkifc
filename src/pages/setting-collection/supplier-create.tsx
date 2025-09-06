// pages/supplier-create.tsx
import React, { useState } from "react";

type Supplier = { id: number; name: string; contact: string };

const SupplierCreate: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const handleAddSupplier = () => {
    if (!name) return;
    const newSupplier = { id: Date.now(), name, contact };
    setSuppliers([...suppliers, newSupplier]);
    setName("");
    setContact("");
  };

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Add Supplier</h1>

      <section className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Add New Supplier</h2>
        <div className="flex flex-col space-y-3">
          <input
            type="text"
            placeholder="Supplier Name"
            className="p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Contact Info"
            className="p-2 border rounded"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleAddSupplier}
          >
            Add Supplier
          </button>
        </div>
      </section>

      <section className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Existing Suppliers</h2>
        {suppliers.length === 0 ? (
          <p>No suppliers yet.</p>
        ) : (
          <ul className="space-y-2">
            {suppliers.map((s) => (
              <li key={s.id} className="p-2 border rounded">
                <strong>{s.name}</strong> - {s.contact}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default SupplierCreate;
