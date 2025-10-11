import { Warehouse, Factory } from "@/types";

interface WarehouseCardProps {
  warehouse: Warehouse;
  factoryName?: string;
  onEdit: (warehouse: Warehouse) => void;
  onViewDetails?: (warehouse: Warehouse) => void;
}

export default function WarehouseCard({
  warehouse,
  factoryName,
  onEdit,
  onViewDetails,
}: WarehouseCardProps) {
  // Placeholder calculation for occupied space (for future integration)
  const occupied = "--"; // Replace with actual value from your model when available

  return (
    <div className="border rounded-xl p-5 shadow-md hover:shadow-lg transition duration-200 bg-white">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex-1 space-y-2">
          <h2 className="text-xl font-semibold">{warehouse.name || "Unnamed Warehouse"}</h2>
          <p className="text-gray-500 text-sm">{warehouse.location || "No location specified"}</p>
          {factoryName && (
            <p className="text-gray-500 text-sm">Factory: {factoryName}</p>
          )}
          {warehouse.description && (
            <p className="text-gray-600 text-sm">{warehouse.description}</p>
          )}

          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-700">
            <p>
              Capacity: <span className="font-medium">{warehouse.capacity?.toLocaleString() || "0"}</span>
            </p>
            <p>
              Occupied: <span className="font-medium">{occupied}</span>
            </p>
            <p>
              Status:{" "}
              <span className={`font-medium ${warehouse.status === "active" ? "text-green-600" : "text-red-600"}`}>
                {warehouse.status || "N/A"}
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-start items-end gap-2">
          <button
            className="text-blue-600 hover:underline text-sm font-medium"
            onClick={() => onEdit(warehouse)}
          >
            Edit
          </button>
          {onViewDetails && (
            <button
              className="text-gray-700 hover:underline text-sm font-medium"
              onClick={() => onViewDetails(warehouse)}
            >
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
