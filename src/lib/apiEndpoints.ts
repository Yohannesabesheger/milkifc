const BASE_URL = "https://m.besheger.com";


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

// export const API = {
//   LOGIN: `${BASE_URL}/auth/jwt/create`,
//   ME: `${BASE_URL}/auth/users/me/`,
//   CUSTOMERS: `${BASE_URL}/customers/`,
//   COMPANIES: `${BASE_URL}/companies/`,
//   FACTORIES: `${BASE_URL}/factories/`,
//   WAREHOUSES: `${BASE_URL}/warehouses/`,
//   CATEGORIES: `${BASE_URL}/categories/`,
//   PRODUCTS: `${BASE_URL}/products/`,
//   STOCKS: `${BASE_URL}/stocks/`,
//   STOCK_MOVEMENTS: `${BASE_URL}/stock-movements/`,
//   SUPPLIERS: `${BASE_URL}/suppliers/`,
//   PURCHASE_ORDERS: `${BASE_URL}/purchase-orders/`,
//   SALES_ORDERS: `${BASE_URL}/sales-orders/`,
//   INVOICES: `${BASE_URL}/invoices/`,
//   PAYMENT_METHODS: `${BASE_URL}/payment-methods/`,
//   PAYMENTS: `${BASE_URL}/payments/`,
// };
