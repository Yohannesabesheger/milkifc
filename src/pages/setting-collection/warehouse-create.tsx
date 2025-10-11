// // "use client";

// // import { useState, useEffect } from "react";
// // import { WarehouseList, WarehouseForm, WarehouseHeader } from "@/components/warehouses";
// // import { Warehouse } from "@/types";
// // import axios from "axios";
// // import { API } from "@/lib/apiEndpoints";
// // import { getAccessToken } from "@/lib/api";

// // export default function WarehousesPage() {
// //   const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   // Fetch warehouses
// //   const fetchWarehouses = async () => {
// //     setLoading(true);
// //     setError("");
// //     try {
// //       const token = getAccessToken();
// //       const res = await axios.get("/api/proxy", {
// //         params: { endpoint: API.WAREHOUSES },
// //         headers: { Authorization: `JWT ${token}` },
// //       });
// //       setWarehouses(res.data);
// //     } catch (err: any) {
// //       console.error("Error fetching warehouses:", err);
// //       setError(err.response?.data?.detail || "Failed to fetch warehouses");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchWarehouses();
// //   }, []);

// //   // Add or update warehouse
// //   const handleSubmit = async (data: Warehouse, isEdit = false) => {
// //     try {
// //       const token = getAccessToken();
// //       if (isEdit) {
// //         await axios.put(
// //           "/api/proxy",
// //           { endpoint: `${API.WAREHOUSES}${data.id}/`, payload: data },
// //           { headers: { Authorization: `JWT ${token}` } }
// //         );
// //         setWarehouses((prev) => prev.map((w) => (w.id === data.id ? data : w)));
// //       } else {
// //         const res = await axios.post(
// //           "/api/proxy",
// //           { endpoint: API.WAREHOUSES, payload: data },
// //           { headers: { Authorization: `JWT ${token}` } }
// //         );
// //         setWarehouses((prev) => [...prev, res.data]);
// //       }
// //     } catch (err: any) {
// //       console.error("Error saving warehouse:", err);
// //       setError(err.response?.data?.detail || "Failed to save warehouse");
// //     }
// //   };

// //   // Delete warehouse
// //   const handleDelete = async (id: string) => {
// //     if (!confirm("Are you sure you want to delete this warehouse?")) return;
// //     try {
// //       const token = getAccessToken();
// //       await axios.delete("/api/proxy", {
// //         data: { endpoint: `${API.WAREHOUSES}${id}/` },
// //         headers: { Authorization: `JWT ${token}` },
// //       });
// //       setWarehouses((prev) => prev.filter((w) => w.id !== id));
// //     } catch (err: any) {
// //       console.error("Error deleting warehouse:", err);
// //       setError(err.response?.data?.detail || "Failed to delete warehouse");
// //     }
// //   };

// //   return (
// //     <main className="min-h-screen p-6 bg-gray-100">
// //       <WarehouseHeader onRefresh={fetchWarehouses} />
// //       {error && <div className="mb-4 text-red-600">{error}</div>}

// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //         {/* Left: Form */}
// //         <section className="bg-white rounded shadow p-4">
// //           <h2 className="text-lg font-semibold mb-4">Add or Edit Warehouse</h2>
// //           <WarehouseForm onSubmit={handleSubmit} />
// //         </section>

// //         {/* Right: List */}
// //         <section className="bg-white rounded shadow p-4">
// //           <h2 className="text-lg font-semibold mb-4">Existing Warehouses</h2>
// //           <WarehouseList
// //             warehouses={warehouses}
// //             loading={loading}
// //             onDelete={handleDelete}
// //             onRefresh={fetchWarehouses}
// //           />
// //         </section>
// //       </div>
// //     </main>
// //   );
// // }
// "use client";

// import { useState, useEffect } from "react";
// import { WarehouseList, WarehouseForm, WarehouseHeader } from "@/components/warehouses";
// import { Warehouse } from "@/types";
// import axios from "axios";
// import { API } from "@/lib/apiEndpoints";
// import { getAccessToken } from "@/lib/api";

// export default function WarehousesPage() {
//   const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [editingWarehouse, setEditingWarehouse] = useState<Warehouse | null>(null);
//   const [showForm, setShowForm] = useState(false);

//   // Fetch warehouses
//   const fetchWarehouses = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const token = getAccessToken();
//       const res = await axios.get("/api/proxy", {
//         params: { endpoint: API.WAREHOUSES },
//         headers: { Authorization: `JWT ${token}` },
//       });
//       setWarehouses(res.data);
//     } catch (err: any) {
//       console.error("Error fetching warehouses:", err);
//       setError(err.response?.data?.detail || "Failed to fetch warehouses");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchWarehouses();
//   }, []);

//   // Add or update warehouse
//   const handleSubmit = async (data: Warehouse) => {
//     try {
//       const token = getAccessToken();
//       if (editingWarehouse) {
//         await axios.put(
//           "/api/proxy",
//           { endpoint: `${API.WAREHOUSES}${data.id}/`, payload: data },
//           { headers: { Authorization: `JWT ${token}` } }
//         );
//         setWarehouses((prev) => prev.map((w) => (w.id === data.id ? data : w)));
//       } else {
//         const res = await axios.post(
//           "/api/proxy",
//           { endpoint: API.WAREHOUSES, payload: data },
//           { headers: { Authorization: `JWT ${token}` } }
//         );
//         setWarehouses((prev) => [...prev, res.data]);
//       }
//       setEditingWarehouse(null);
//       setShowForm(false);
//     } catch (err: any) {
//       console.error("Error saving warehouse:", err);
//       setError(err.response?.data?.detail || "Failed to save warehouse");
//     }
//   };

//   // Edit warehouse
//   const handleEdit = (warehouse: Warehouse) => {
//     setEditingWarehouse(warehouse);
//     setShowForm(true);
//   };

//   // Delete warehouse
//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this warehouse?")) return;
//     try {
//       const token = getAccessToken();
//       await axios.delete("/api/proxy", {
//         data: { endpoint: `${API.WAREHOUSES}${id}/` },
//         headers: { Authorization: `JWT ${token}` },
//       });
//       setWarehouses((prev) => prev.filter((w) => w.id !== id));
//     } catch (err: any) {
//       console.error("Error deleting warehouse:", err);
//       setError(err.response?.data?.detail || "Failed to delete warehouse");
//     }
//   };

//   return (
//     <main className="min-h-screen p-6 bg-gray-100">
//       <WarehouseHeader
//         onRefresh={fetchWarehouses}
//         onAdd={() => {
//           setEditingWarehouse(null);
//           setShowForm((prev) => !prev);
//         }}
//       />
//       {error && <div className="mb-4 text-red-600">{error}</div>}

//       <div className="space-y-6">
//         {showForm && (
//           <section className="bg-white rounded shadow p-4">
//             <h2 className="text-lg font-semibold mb-4">
//               {editingWarehouse ? "Edit Warehouse" : "Add Warehouse"}
//             </h2>
//             <WarehouseForm
//               onSubmit={handleSubmit}
//               initialData={editingWarehouse || undefined}
//             />
//           </section>
//         )}

//         <section className="bg-white rounded shadow p-4">
//           <h2 className="text-lg font-semibold mb-4">Existing Warehouses</h2>
//           <WarehouseList
//             warehouses={warehouses}
//             loading={loading}
//             onDelete={handleDelete}
//             onEdit={handleEdit}
//             onRefresh={fetchWarehouses}
//           />
//         </section>
//       </div>
//     </main>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { WarehouseList, WarehouseForm, WarehouseHeader } from "@/components/warehouses";
import { Warehouse } from "@/types";
import axios from "axios";
import { API } from "@/lib/apiEndpoints";
import { getAccessToken } from "@/lib/api";

export default function WarehousesPage() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingWarehouse, setEditingWarehouse] = useState<Warehouse | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch warehouses safely
  const fetchWarehouses = async () => {
    setLoading(true);
    setError("");
    try {
      const token = getAccessToken();
      const res = await axios.get("/api/proxy", {
        params: { endpoint: API.WAREHOUSES },
        headers: { Authorization: `JWT ${token}` },
      });
      setWarehouses(res.data);
    } catch (err: any) {
      console.error("Error fetching warehouses:", err);
      setError(err.response?.data?.detail || "Failed to fetch warehouses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const handleSubmit = async (data: Warehouse) => {
    try {
      const token = getAccessToken();
      if (editingWarehouse) {
        await axios.put(
          "/api/proxy",
          { endpoint: `${API.WAREHOUSES}${data.id}/`, payload: data },
          { headers: { Authorization: `JWT ${token}` } }
        );
        setWarehouses((prev) => prev.map((w) => (w.id === data.id ? data : w)));
      } else {
        const res = await axios.post(
          "/api/proxy",
          { endpoint: API.WAREHOUSES, payload: data },
          { headers: { Authorization: `JWT ${token}` } }
        );
        setWarehouses((prev) => [...prev, res.data]);
      }
      setEditingWarehouse(null);
      setShowForm(false);
    } catch (err: any) {
      console.error("Error saving warehouse:", err);
      setError(err.response?.data?.detail || "Failed to save warehouse");
    }
  };

  const handleEdit = (warehouse: Warehouse) => {
    setEditingWarehouse(warehouse);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this warehouse?")) return;
    try {
      const token = getAccessToken();
      await axios.delete("/api/proxy", {
        data: { endpoint: `${API.WAREHOUSES}${id}/` },
        headers: { Authorization: `JWT ${token}` },
      });
      setWarehouses((prev) => prev.filter((w) => w.id !== id));
    } catch (err: any) {
      console.error("Error deleting warehouse:", err);
      setError(err.response?.data?.detail || "Failed to delete warehouse");
    }
  };

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <WarehouseHeader
        onRefresh={fetchWarehouses}
        onAdd={() => {
          setEditingWarehouse(null);
          setShowForm((prev) => !prev);
        }}
      />

      {error && <div className="mb-4 text-red-600">{error}</div>}

      <div className="space-y-6">
        {showForm && (
          <section className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-4">
              {editingWarehouse ? "Edit Warehouse" : "Add Warehouse"}
            </h2>
            <WarehouseForm
              onSubmit={handleSubmit}
              initialData={editingWarehouse || undefined}
            />
          </section>
        )}

        <section className="bg-white rounded shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Existing Warehouses</h2>
          <WarehouseList
            warehouses={warehouses}
            loading={loading}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onRefresh={fetchWarehouses}
          />
        </section>
      </div>
    </main>
  );
}
