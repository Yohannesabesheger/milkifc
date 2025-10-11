import { Warehouse } from "@/types";
import WarehouseCard from "./WarehouseCard";


interface WarehouseListProps {
  warehouses: Warehouse[];
  onEdit: (warehouse: Warehouse) => void;
}

export default function WarehouseList({ warehouses, onEdit }: WarehouseListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {warehouses.map((warehouse) => (
        <WarehouseCard key={warehouse.id} warehouse={warehouse} onEdit={onEdit} />
      ))}
    </div>
  );
}
