const BASE_URL = "https://m.besheger.com";

export const API = {
  LOGIN: `${BASE_URL}/auth/jwt/create`,
  ME: `${BASE_URL}/auth/users/me/`,
  CUSTOMERS: `${BASE_URL}/customers/`,
  COMPANIES: `${BASE_URL}/companies/`,
  FACTORIES: `${BASE_URL}/factories/`,
  WAREHOUSES: `${BASE_URL}/warehouses/`,
  CATEGORIES: `${BASE_URL}/categories/`,
  PRODUCTS: `${BASE_URL}/products/`,
  STOCKS: `${BASE_URL}/stocks/`,
  STOCK_MOVEMENTS: `${BASE_URL}/stock-movements/`,
  SUPPLIERS: `${BASE_URL}/suppliers/`,
  PURCHASE_ORDERS: `${BASE_URL}/purchase-orders/`,
  SALES_ORDERS: `${BASE_URL}/sales-orders/`,
  INVOICES: `${BASE_URL}/invoices/`,
  PAYMENT_METHODS: `${BASE_URL}/payment-methods/`,
  PAYMENTS: `${BASE_URL}/payments/`,
};
