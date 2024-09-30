export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api',
  ENDPOINTS: {
    CUSTOMERS: '/customer',
    REGISTER: '/customer',
    BALANCE: (document: string, phone: string) => `/customer/balance/${document}/${phone}`,
    ADD_FUNDS: '/pay/add-funds',
    PAY: '/pay',
    CONFIRM: '/pay/confirm',
  }
}