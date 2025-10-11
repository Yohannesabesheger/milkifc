"use client";

interface ProductHeaderProps {
  onRefresh?: () => void;
  onAdd?: () => void;
}

export default function ProductHeader({ onRefresh, onAdd }: ProductHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-1xl font-bold">Products Dashboard</h1>
      <div className="flex gap-1">
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Refresh
          </button>
        )}
        {onAdd && (
          <button
            onClick={onAdd}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Product
          </button>
        )}
      </div>
    </div>
  );
}
