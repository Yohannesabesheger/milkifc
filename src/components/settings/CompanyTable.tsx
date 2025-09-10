import React from "react";
import { Company } from "@/types";

type Props = {
  companies: Company[];
  loading: boolean;
  editingId: number | null;
  startEdit: (company: Company) => void;
  handleDelete: (id: number) => void;
  fetching: boolean;
};

const CompanyTable: React.FC<Props> = ({
  companies,
  loading,
  editingId,
  startEdit,
  handleDelete,
  fetching,
}) => {
  if (fetching) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-12 h-12 border-4 border-blue-600 border-dashed rounded-full animate-spin" />
      </div>
    );
  }

  if (companies.length === 0) return <p>No companies yet.</p>;

  return (
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
              <td className="px-4 py-2 border">
                {new Date(c.created_at).toLocaleString()}
              </td>
              <td className="px-4 py-2 border space-x-2">
                <button
                  className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  onClick={() => startEdit(c)}
                  disabled={loading}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleDelete(c.id)}
                  disabled={loading}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyTable;
