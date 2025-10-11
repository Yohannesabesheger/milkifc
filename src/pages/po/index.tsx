"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { CORE_ENDPOINTS, POSO_ENDPOINTS, INVENTORY_ENDPOINTS } from "@/lib/apiEndpoints";
import { getAccessToken } from "@/lib/api";

interface SummaryCardProps {
  title: string;
  count?: number;
  link: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, count, link }) => (
  <a
    href={link}
    className="bg-white shadow rounded-lg p-6 w-64 flex flex-col items-center justify-center hover:shadow-lg transition"
  >
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    {count !== undefined && <p className="text-3xl font-bold">{count}</p>}
    <p className="mt-2 text-blue-600 underline">Go →</p>
  </a>
);

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({
    companies: 0,
    purchaseOrders: 0,
    suppliers: 0,
    products: 0,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);
      try {
        const token = getAccessToken();
        if (!token) throw new Error("No access token");

        const endpoints = [
          { key: "companies", url: CORE_ENDPOINTS.COMPANIES },
          { key: "purchaseOrders", url: POSO_ENDPOINTS.PURCHASE_ORDERS },
          { key: "suppliers", url: POSO_ENDPOINTS.SUPPLIERS },
          { key: "products", url: INVENTORY_ENDPOINTS.PRODUCTS },
        ];

        const results = await Promise.all(
          endpoints.map((ep) =>
            axios.get("/api/proxy", { params: { endpoint: ep.url }, headers: { Authorization: `JWT ${token}` } })
          )
        );

        setCounts({
          companies: results[0].data.length,
          purchaseOrders: results[1].data.length,
          suppliers: results[2].data.length,
          products: results[3].data.length,
        });
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.detail || err.message || "Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  if (loading) return <p className="text-center mt-20">Loading dashboard...</p>;
  if (error) return <p className="text-center mt-20 text-red-600">{error}</p>;

  return (
    <main className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard title="Companies" count={counts.companies} link="/companies" />
        <SummaryCard title="Purchase Orders" count={counts.purchaseOrders} link="/purchase-orders" />
        <SummaryCard title="Suppliers" count={counts.suppliers} link="/suppliers" />
        <SummaryCard title="Products" count={counts.products} link="/products" />
      </div>
    </main>
  );
};

export default Dashboard;
