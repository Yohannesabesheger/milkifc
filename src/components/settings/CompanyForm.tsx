import React from "react";

type Props = {
  name: string;
  description: string;
  loading: boolean;
  editingId: number | null;
  setName: (val: string) => void;
  setDescription: (val: string) => void;
  setEditName: (val: string) => void;
  setEditDescription: (val: string) => void;
  handleAddCompany: () => void;
  saveEdit: (id: number) => void;
  cancelEdit: () => void;
  error?: string;
};

const CompanyForm: React.FC<Props> = ({
  name,
  description,
  loading,
  editingId,
  setName,
  setDescription,
  setEditName,
  setEditDescription,
  handleAddCompany,
  saveEdit,
  cancelEdit,
  error,
}) => {
  return (
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
          value={editingId ? description : name}
          onChange={(e) =>
            editingId ? setEditName(e.target.value) : setName(e.target.value)
          }
          disabled={loading}
        />
        <textarea
          placeholder="Description"
          className="p-2 border rounded"
          value={editingId ? description : description}
          onChange={(e) =>
            editingId
              ? setEditDescription(e.target.value)
              : setDescription(e.target.value)
          }
          disabled={loading}
        />
        {editingId ? (
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 text-white rounded flex items-center justify-center gap-2 ${
                loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
              }`}
              onClick={() => saveEdit(editingId)}
              disabled={loading}
            >
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
        ) : (
          <button
            className={`px-4 py-2 text-white rounded flex items-center justify-center gap-2 ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
            onClick={handleAddCompany}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Company"}
          </button>
        )}
      </div>
    </section>
  );
};

export default CompanyForm;
