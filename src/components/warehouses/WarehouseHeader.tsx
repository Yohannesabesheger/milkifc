//import { Button } from "@/components/ui/button";

import { Button } from "../ui/button";

interface WarehouseHeaderProps {
  onAdd: () => void;
}

export default function WarehouseHeader({ onAdd }: WarehouseHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold">Warehouses</h1>
      <Button onClick={onAdd}>Add Warehouse</Button>
    </div>
  );
}
