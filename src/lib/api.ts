const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

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
  batteryCustomization: {
    list: () => fetch(`${API_BASE_URL}/battery-customization/`).then(handleResponse),
    create: (data: any) => fetch(`${API_BASE_URL}/battery-customization/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(handleResponse),
    update: (id: string, data: any) => fetch(`${API_BASE_URL}/battery-customization/${id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(handleResponse),
  },
  maintenance: {
    list: () => fetch(`${API_BASE_URL}/maintenance/`).then(handleResponse),
    create: (data: any) => fetch(`${API_BASE_URL}/maintenance/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(handleResponse),
    update: (id: string, data: any) => fetch(`${API_BASE_URL}/maintenance/${id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(handleResponse),
  },
  tradeIn: {
    list: () => fetch(`${API_BASE_URL}/trade-in/`).then(handleResponse),
    create: (data: any) => fetch(`${API_BASE_URL}/trade-in/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(handleResponse),
    update: (id: string, data: any) => fetch(`${API_BASE_URL}/trade-in/${id}/`, {
      method: 'PATCH',
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
  },
  settings: {
    get: () => fetch(`${API_BASE_URL}/settings/`).then(handleResponse),
    update: (data: any) => fetch(`${API_BASE_URL}/settings/1/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(handleResponse),
  }
};