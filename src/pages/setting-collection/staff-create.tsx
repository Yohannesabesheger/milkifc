// pages/staff-create.tsx
import React, { useState } from "react";

type Staff = { id: number; name: string; role: string; email: string };

const StaffCreate: React.FC = () => {
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  const handleAddStaff = () => {
    if (!name || !email) return;
    const newStaff = { id: Date.now(), name, role, email };
    setStaffList([...staffList, newStaff]);
    setName("");
    setRole("");
    setEmail("");
  };

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Add Staff User</h1>

      <section className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Add New Staff</h2>
        <div className="flex flex-col space-y-3">
          <input
            type="text"
            placeholder="Name"
            className="p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Role"
            className="p-2 border rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleAddStaff}
          >
            Add Staff User
          </button>
        </div>
      </section>

      <section className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Existing Staff Users</h2>
        {staffList.length === 0 ? (
          <p>No staff users yet.</p>
        ) : (
          <ul className="space-y-2">
            {staffList.map((s) => (
              <li key={s.id} className="p-2 border rounded">
                <strong>{s.name}</strong> ({s.role}) - {s.email}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default StaffCreate;
