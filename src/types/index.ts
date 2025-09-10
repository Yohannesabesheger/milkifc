export type Company = {
  id: number;
  name: string;
  description: string;
  customer: number;
  logo_url?: string;
  company_status: string;
  created_at: string;
  updated_at: string;
};


export type Factory = {
  id: number;
  name: string;
  description: string;
  location_name: string;
  city: string;
  admin_region: string;
  latitude_point: string;
  longitude_point: string;
  is_operational: boolean;
  production_capacity: number;
  is_authorized: boolean;
  authorization_time: string;
  created_at: string;
  updated_at: string;
  inputer: number;
  company: number;
};


export type Warehouse = {
  id: number;
  capacity: number;
  status: string;
  is_authorized: boolean;
  authorization_time: string | null;
  created_at: string;
  updated_at: string;
  authorized_by: number;
  factory: number;
};


export type Product = {
  id: number;
  code: string;
  name: string;
  description: string;
  category: number;
  unit_of_measure: string;
  status: string;
  is_authorized: boolean;
  authorization_time: string | null;
  created_at: string;
  updated_at: string;
  company: number;
  authorizer: number;
  inputer: number;
};
