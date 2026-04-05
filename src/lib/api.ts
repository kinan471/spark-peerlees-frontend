const API_BASE_URL = 'http://localhost:8000/api';

async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export const api = {
  products: {
    list: () => fetch(`${API_BASE_URL}/products/`).then(handleResponse),
    get: (id: string) => fetch(`${API_BASE_URL}/products/${id}/`).then(handleResponse),
    create: (data: any) => fetch(`${API_BASE_URL}/products/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(handleResponse),
    update: (id: string, data: any) => fetch(`${API_BASE_URL}/products/${id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(handleResponse),
    delete: (id: string) => fetch(`${API_BASE_URL}/products/${id}/`, {
      method: 'DELETE'
    }).then(res => res.status === 204 ? true : handleResponse(res)),
    scrape: (url: string) => fetch(`${API_BASE_URL}/products/scrape/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    }).then(handleResponse),
    syncAll: () => fetch(`${API_BASE_URL}/products/sync-all/`, {
      method: 'POST'
    }).then(handleResponse),
  },
  settings: {
    get: () => fetch(`${API_BASE_URL}/settings/current/`).then(handleResponse),
    update: (data: any) => fetch(`${API_BASE_URL}/settings/current/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(handleResponse),
  },
  messages: {
    list: () => fetch(`${API_BASE_URL}/messages/`).then(handleResponse),
    create: (data: any) => fetch(`${API_BASE_URL}/messages/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(handleResponse),
    update: (id: string, data: any) => fetch(`${API_BASE_URL}/messages/${id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(handleResponse),
    
    // --- الإضافة الجديدة هنا ---
    markAsRead: (id: string) => fetch(`${API_BASE_URL}/messages/${id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_read: true }) // نرسل فقط الحقل المطلوب تحديثه
    }).then(handleResponse),
    // -----------------------
  },
  orders: {
    list: () => fetch(`${API_BASE_URL}/orders/`).then(handleResponse),
    create: (data: any) => fetch(`${API_BASE_URL}/orders/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(handleResponse),
    updateStatus: (id: string, status: string) => fetch(`${API_BASE_URL}/orders/${id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    }).then(handleResponse),
  },
  visits: {
    list: () => fetch(`${API_BASE_URL}/visits/`).then(handleResponse),
    create: (data: any) => fetch(`${API_BASE_URL}/visits/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(handleResponse),
  },
  upload: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return fetch(`${API_BASE_URL}/upload/`, {
      method: 'POST',
      body: formData
    }).then(handleResponse).then(data => data.url);
  }
};