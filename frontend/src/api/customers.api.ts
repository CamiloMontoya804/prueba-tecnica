import { API_CONFIG } from "@/config/api";

interface Pagination {
  page?: number
  limit?: number
}

interface BalanceParams {
  document: string
  phone: string
  amount?: number
}

export async function getCustomers(pagination: Pagination) {
  const data = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CUSTOMERS}`, {
    'cache': 'no-store',
  });
  return data.json();
}

export async function getCustomerBalance(params: BalanceParams) {
  const { document, phone } = params;
  const data = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.BALANCE(document, phone)}`, {
    'cache': 'no-store',
  });
  return data.json();
}

export async function addFunds(params: BalanceParams) {
  const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ADD_FUNDS}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })

  const data = await res.json();
}

export async function createCustomer(customerData: any) {
  const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REGISTER}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customerData),
  })

  const data = await res.json();
}