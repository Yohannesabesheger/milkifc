// pages/settings.tsx
import React from "react";

const Settings: React.FC = () => {
  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {/* Company Section */}
      <section className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Company</h2>
        <p>Manage company details and information.</p>
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Create Company
        </button>
      </section>

      {/* Factory Section */}
      <section className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Factory</h2>
        <p>Manage factories associated with your company.</p>
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Create Factory
        </button>
      </section>

      {/* Warehouses Section */}
      <section className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Warehouses</h2>
        <p>Manage warehouses linked to factories.</p>
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Create Warehouse
        </button>
      </section>

      {/* Staff Users Section */}
      <section className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Staff Users</h2>
        <p>Manage your staff accounts and roles.</p>
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Add Staff User
        </button>
      </section>

      {/* Suppliers Section */}
      <section className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Suppliers</h2>
        <p>Manage your suppliers and contacts.</p>
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Add Supplier
        </button>
      </section>

      {/* Product Lines Section */}
      <section className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Product Lines</h2>
        <p>Manage product lines and categories.</p>
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Add Product Line
        </button>
      </section>

      {/* Warehouse Products Section */}
      <section className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Warehouse Products</h2>
        <p>Manage products stored in warehouses.</p>
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Add Warehouse Product
        </button>
      </section>
    </main>
  );
};

export default Settings;
