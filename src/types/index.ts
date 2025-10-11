

export interface Warehouse {
  id: string;
  factory: string; // could later be expanded to a Factory type
  name: string;
  description: string;
  location: string;
  capacity: number;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface AdminRegion {
  id: string;
  name: string;
  code: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface City {
  id: string;
  name: string;
  admin_region: AdminRegion;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Company {
  id: string;
  name: string;
  description: string;
  logo_url: string;
  status: string;
  created_at: string;
  updated_at: string;
}
export interface Product {
  id: string;
  name: string;
  description: string;
  unit_price: number;
  unit_of_measure: string;
  package_size: string;
  package_name: string;
  status: 'active' | 'inactive' | string;
  factory: string;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface Factory {
  id: string;
  name: string;
  description: string;
  location: string;
  unique_location: string;
  capacity: number | null;
  status: string;
  company: Company;
  city: City;
  admin_region: AdminRegion;
  created_at: string;
  updated_at: string;
}


export interface Inventory {
  id: string;
  product: string;
  warehouse: string;
  quantity: number;
  last_updated: string; // ISO timestamp
  remarks: string;
  locked_amount: number;
  unit_price: number;
  total_value: number | null;
  minimum_threshold: number;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

