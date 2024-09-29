import { API_CONFIG } from "@/config/api";

interface Payment {
  document: string
  phone: string
  amount: number
}

// interface PaymentDetail {
//   code: string
//   description: string
//   amount: number
//   status: string
// }

export async function createPayment(payment: Payment) {
  const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PAY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payment),
  });

  return await res.json();
}

export async function confirmPayment(token: string) {
  
  const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONFIRM}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });
  return await res.json();
}