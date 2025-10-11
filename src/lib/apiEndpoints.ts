 const BASE_URL = "https://m.besheger.com";
//const BASE_URL = "http://localhost:8000";

export const API = {
  LOGIN: `${BASE_URL}/auth/jwt/create`,
  ME: `${BASE_URL}/auth/users/me/`,
  CUSTOMERS: `${BASE_URL}/poso/customers/`,
  COMPANIES: `${BASE_URL}/core/companies/`,
  FACTORIES: `${BASE_URL}/core/factories/`,
  WAREHOUSES: `${BASE_URL}/inventory/warehouses/`,
  CATEGORIES: `${BASE_URL}/inventory/product-packages/`,
  PRODUCTS: `${BASE_URL}/inventory/products/`,
  INVENTORY: `${BASE_URL}/inventory/stocks/`,
  STOCK_MOVEMENTS: `${BASE_URL}/inventory/inventory-movements/`,
  SUPPLIERS: `${BASE_URL}/poso/suppliers/`,
  PURCHASE_ORDERS: `${BASE_URL}/poso/purchase-orders/`,
  POI:`${BASE_URL}/poso/purchase-order-items/`,
  SALES_ORDERS: `${BASE_URL}/poso/sales-orders/`,
  SOI:`${BASE_URL}/poso/sales-order-items/`,  
  INVOICES: `${BASE_URL}/poso/invoices/`,
  PAYMENT_METHODS: `${BASE_URL}/payment-methods/`,
  PAYMENTS: `${BASE_URL}/poso/payments/`,
  CITIES: `${BASE_URL}/core/cities/`,
  ADMIN_REGIONS: `${BASE_URL}/core/admin-regions/`,
};


// Base URLs
//export const BASE_URL = "http://localhost:8000";
export const CORE_BASE = `${BASE_URL}/core`;
export const POSO_BASE = `${BASE_URL}/poso`;
export const INVENTORY_BASE = `${BASE_URL}/inventory`;
export const USERS_BASE = `${BASE_URL}/users`;

// =======================
// CORE Endpoints
// =======================
export const CORE_ENDPOINTS = {
  COMPANIES: `${CORE_BASE}/companies/`,
  FACTORIES: `${CORE_BASE}/factories/`,
  ADMIN_REGIONS: `${CORE_BASE}/admin-regions/`,
  CITIES: `${CORE_BASE}/cities/`,
};

// =======================
// POSO Endpoints
// =======================
export const POSO_ENDPOINTS = {
  SUPPLIERS: `${POSO_BASE}/suppliers/`,
  CUSTOMERS: `${POSO_BASE}/customers/`,
  PURCHASE_ORDERS: `${POSO_BASE}/purchase-orders/`,
  PURCHASE_ORDER_ITEMS: `${POSO_BASE}/purchase-order-items/`,
  SALES_ORDERS: `${POSO_BASE}/sales-orders/`,
  SALES_ORDER_ITEMS: `${POSO_BASE}/sales-order-items/`,
  PAYMENTS: `${POSO_BASE}/payments/`,
  INVOICES: `${POSO_BASE}/invoices/`,
};

// =======================
// INVENTORY Endpoints
// =======================
export const INVENTORY_ENDPOINTS = {
  WAREHOUSES: `${INVENTORY_BASE}/warehouses/`,
  PRODUCT_PACKAGES: `${INVENTORY_BASE}/product-packages/`,
  PRODUCTS: `${INVENTORY_BASE}/products/`,
  STOCKS: `${INVENTORY_BASE}/stocks/`,
  INVENTORY_MOVEMENTS: `${INVENTORY_BASE}/inventory-movements/`,
  STOCK_TRANSFERS: `${INVENTORY_BASE}/stock-transfers/`,
};


