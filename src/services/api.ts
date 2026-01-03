const API_BASE = '/api';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || 'Request failed');
  }
  return response.json();
}

export interface Company {
  id: number;
  company_name: string;
  tax_number: string;
  tax_office: string;
  address: string;
  phone: string;
  email: string;
  is_active: boolean;
}

export interface Employee {
  id: number;
  full_name: string;
  registration_number: string;
  phone: string;
  email: string;
  expertise: string;
  is_active: boolean;
}

export interface Ship {
  id: number;
  ship_name: string;
  imo_number: string;
  flag: string;
  ship_type: string;
  deadweight: number;
  is_active: boolean;
}

export interface LookupItem {
  id: number;
  name: string;
  is_active?: boolean;
}

export interface Province {
  id: number;
  name: string;
}

export interface District {
  id: number;
  province_id: number;
  name: string;
}

export interface WorkOrder {
  id: number;
  file_type: 'ASIC' | 'ASI' | 'FT';
  file_number: number;
  status: string;
  open_date: string;
  report_date: string | null;
  inspection_date: string | null;
  date_range_end: string | null;
  invoice_number: string;
  responsible: string;
  tonnage: number | null;
  topic_id: number | null;
  company_id: number | null;
  customer_ref_no: string;
  ship_id: number | null;
  inspection_area_id: number | null;
  inspection_item_id: number | null;
  supervision_location_id: number | null;
  province_id: number | null;
  district_id: number | null;
  other_tasks_description: string;
  company_name?: string;
  ship_name?: string;
  inspection_area_name?: string;
  inspection_item_name?: string;
  supervision_location_name?: string;
  topic_name?: string;
  province_name?: string;
  district_name?: string;
}

export interface CreateWorkOrderData {
  file_type: 'ASIC' | 'ASI' | 'FT';
  file_number: number;
  status?: string;
  report_date?: string | null;
  inspection_date?: string | null;
  date_range_end?: string | null;
  invoice_number?: string;
  responsible?: string;
  tonnage?: number | null;
  topic_id?: number | null;
  company_id?: number | null;
  customer_ref_no?: string;
  ship_id?: number | null;
  inspection_area_id?: number | null;
  inspection_item_id?: number | null;
  supervision_location_id?: number | null;
  province_id?: number | null;
  district_id?: number | null;
  other_tasks_description?: string;
  inspection_type_ids?: number[];
  personnel_ids?: number[];
  selected_tasks?: string[];
}

export const api = {
  companies: {
    getAll: () => fetch(`${API_BASE}/companies`).then(r => handleResponse<Company[]>(r)),
    create: (data: Partial<Company>) => 
      fetch(`${API_BASE}/companies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(r => handleResponse<Company>(r)),
  },

  employees: {
    getAll: () => fetch(`${API_BASE}/employees`).then(r => handleResponse<Employee[]>(r)),
    create: (data: Partial<Employee>) =>
      fetch(`${API_BASE}/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(r => handleResponse<Employee>(r)),
  },

  ships: {
    getAll: () => fetch(`${API_BASE}/ships`).then(r => handleResponse<Ship[]>(r)),
    create: (data: Partial<Ship>) =>
      fetch(`${API_BASE}/ships`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(r => handleResponse<Ship>(r)),
  },

  inspectionAreas: {
    getAll: () => fetch(`${API_BASE}/inspection-areas`).then(r => handleResponse<LookupItem[]>(r)),
    create: (name: string) =>
      fetch(`${API_BASE}/inspection-areas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      }).then(r => handleResponse<LookupItem>(r)),
  },

  inspectionItems: {
    getAll: () => fetch(`${API_BASE}/inspection-items`).then(r => handleResponse<LookupItem[]>(r)),
    create: (name: string) =>
      fetch(`${API_BASE}/inspection-items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      }).then(r => handleResponse<LookupItem>(r)),
  },

  inspectionTypes: {
    getAll: () => fetch(`${API_BASE}/inspection-types`).then(r => handleResponse<LookupItem[]>(r)),
    create: (name: string) =>
      fetch(`${API_BASE}/inspection-types`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      }).then(r => handleResponse<LookupItem>(r)),
  },

  locations: {
    getAll: () => fetch(`${API_BASE}/locations`).then(r => handleResponse<LookupItem[]>(r)),
    create: (name: string) =>
      fetch(`${API_BASE}/locations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      }).then(r => handleResponse<LookupItem>(r)),
  },

  topics: {
    getAll: () => fetch(`${API_BASE}/topics`).then(r => handleResponse<LookupItem[]>(r)),
    create: (name: string) =>
      fetch(`${API_BASE}/topics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      }).then(r => handleResponse<LookupItem>(r)),
  },

  provinces: {
    getAll: () => fetch(`${API_BASE}/provinces`).then(r => handleResponse<Province[]>(r)),
  },

  districts: {
    getByProvince: (provinceId: number) => 
      fetch(`${API_BASE}/districts/${provinceId}`).then(r => handleResponse<District[]>(r)),
  },

  workOrders: {
    getAll: () => fetch(`${API_BASE}/work-orders`).then(r => handleResponse<WorkOrder[]>(r)),
    getById: (id: number) => fetch(`${API_BASE}/work-orders/${id}`).then(r => handleResponse<WorkOrder & { inspection_types: {id: number, name: string}[], personnel: {id: number, full_name: string}[], tasks: string[] }>(r)),
    getNextNumber: (fileType: string) =>
      fetch(`${API_BASE}/work-orders/next-number/${fileType}`)
        .then(r => handleResponse<{ nextNumber: number }>(r)),
    create: (data: CreateWorkOrderData) =>
      fetch(`${API_BASE}/work-orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(r => handleResponse<WorkOrder>(r)),
    update: (id: number, data: Partial<CreateWorkOrderData>) =>
      fetch(`${API_BASE}/work-orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(r => handleResponse<{ success: boolean }>(r)),
  },
};
