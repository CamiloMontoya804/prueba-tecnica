import { API_CONFIG } from "@/config/api";

// interface Pagination {
//   page?: number
//   limit?: number
// }

interface BalanceParams {
  document: string
  phone: string
  amount?: number
}

interface CustomerData {
  document: string;
  name: string;
  email: string;
  phone: string;
}

export async function getCustomers() {
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
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ADD_FUNDS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al hacer la recarga de billetera.');
    }
  } catch (error) {
    throw error;
  }
}

export async function createCustomer(customerData: CustomerData) {
  const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REGISTER}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customerData),
  });

  return res.json();
}