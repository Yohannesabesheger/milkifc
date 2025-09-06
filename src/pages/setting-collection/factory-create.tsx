// pages/factory-create.tsx
import React, { useState } from "react";

interface Factory {
  id: number;
  name: string;
  location: string;
  manager: string;
}

const FactoryCreate: React.FC = () => {
  const [factoryName, setFactoryName] = useState("");
  const [location, setLocation] = useState("");
  const [manager, setManager] = useState("");
  const [factories, setFactories] = useState<Factory[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newFactory: Factory = {
      id: factories.length + 1,
      name: factoryName,
      location,
      manager,
    };

    setFactories([...factories, newFactory]);
    setFactoryName("");
    setLocation("");
    setManager("");
  };

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Create Factory</h1>

      {/* Form */}
      <form
        className="bg-white p-6 rounded shadow max-w-lg mb-8"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Factory Name
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={factoryName}
            onChange={(e) => setFactoryName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Location
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Manager Name
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={manager}
            onChange={(e) => setManager(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create Factory
        </button>
      </form>

      {/* Existing Factories List */}
      <section className="bg-white p-6 rounded shadow max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4">Existing Factories</h2>

        {factories.length === 0 ? (
          <p className="text-gray-600">No factories created yet.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2 text-left">#</th>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Location</th>
                <th className="border px-4 py-2 text-left">Manager</th>
              </tr>
            </thead>
            <tbody>
              {factories.map((factory) => (
                <tr key={factory.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{factory.id}</td>
                  <td className="border px-4 py-2">{factory.name}</td>
                  <td className="border px-4 py-2">{factory.location}</td>
                  <td className="border px-4 py-2">{factory.manager}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
};

export default FactoryCreate;
