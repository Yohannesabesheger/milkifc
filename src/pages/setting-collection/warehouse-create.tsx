// pages/warehouse-create.tsx
import React, { useState } from "react";

type Warehouse = { id: number; name: string; location: string };

const WarehouseCreate: React.FC = () => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const handleAddWarehouse = () => {
    if (!name) return;
    const newWarehouse = { id: Date.now(), name, location };
    setWarehouses([...warehouses, newWarehouse]);
    setName("");
    setLocation("");
  };

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Create Warehouse</h1>

      <section className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Add New Warehouse</h2>
        <div className="flex flex-col space-y-3">
          <input
            type="text"
            placeholder="Warehouse Name"
            className="p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            className="p-2 border rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleAddWarehouse}
          >
            Add Warehouse
          </button>
        </div>
      </section>

      <section className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Existing Warehouses</h2>
        {warehouses.length === 0 ? (
          <p>No warehouses yet.</p>
        ) : (
          <ul className="space-y-2">
            {warehouses.map((w) => (
              <li key={w.id} className="p-2 border rounded">
                <strong>{w.name}</strong> - {w.location}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default WarehouseCreate;
