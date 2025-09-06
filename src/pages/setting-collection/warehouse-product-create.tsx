// pages/product-line-create.tsx
import React, { useState } from "react";

type ProductLine = { id: number; name: string; description: string };

const ProductLineCreate: React.FC = () => {
  const [lines, setLines] = useState<ProductLine[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleAddLine = () => {
    if (!name) return;
    const newLine = { id: Date.now(), name, description };
    setLines([...lines, newLine]);
    setName("");
    setDescription("");
  };

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Add Product Line</h1>

      <section className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">New Product Line</h2>
        <div className="flex flex-col space-y-3">
          <input
            type="text"
            placeholder="Line Name"
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
            onClick={handleAddLine}
          >
            Add Product Line
          </button>
        </div>
      </section>

      <section className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Existing Product Lines</h2>
        {lines.length === 0 ? (
          <p>No product lines yet.</p>
        ) : (
          <ul className="space-y-2">
            {lines.map((l) => (
              <li key={l.id} className="p-2 border rounded">
                <strong>{l.name}</strong>: {l.description}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default ProductLineCreate;
