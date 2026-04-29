const API_BASE = 'http://localhost:8080/api';

export const api = {
  employees: {
    getAll: () => fetch(`${API_BASE}/employees`).then(res => res.json()),
    getById: (id) => fetch(`${API_BASE}/employees/${id}`).then(res => res.json()),
    search: (keyword, department, status) => {
      const params = new URLSearchParams();
      if (keyword) params.append('keyword', keyword);
      if (department) params.append('department', department);
      if (status) params.append('status', status);
      return fetch(`${API_BASE}/employees/search?${params}`).then(res => res.json());
    },
    create: (data) => fetch(`${API_BASE}/employees`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),
    update: (id, data) => fetch(`${API_BASE}/employees/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),
    delete: (id) => fetch(`${API_BASE}/employees/${id}`, { method: 'DELETE' })
  },
  roles: {
    getAll: () => fetch(`${API_BASE}/roles`).then(res => res.json()),
    getById: (id) => fetch(`${API_BASE}/roles/${id}`).then(res => res.json()),
    search: (keyword, status) => {
      const params = new URLSearchParams();
      if (keyword) params.append('keyword', keyword);
      if (status) params.append('status', status);
      return fetch(`${API_BASE}/roles/search?${params}`).then(res => res.json());
    },
    create: (data) => fetch(`${API_BASE}/roles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),
    update: (id, data) => fetch(`${API_BASE}/roles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),
    delete: (id) => fetch(`${API_BASE}/roles/${id}`, { method: 'DELETE' })
  },
  attendance: {
    getAll: () => fetch(`${API_BASE}/attendance`).then(res => res.json()),
    create: (data) => fetch(`${API_BASE}/attendance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),
    update: (id, data) => fetch(`${API_BASE}/attendance/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json())
  },
  leaves: {
    getAll: () => fetch(`${API_BASE}/leaves`).then(res => res.json()),
    create: (data) => fetch(`${API_BASE}/leaves`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),
    updateStatus: (id, status) => fetch(`${API_BASE}/leaves/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    }).then(res => res.json()),
    delete: (id) => fetch(`${API_BASE}/leaves/${id}`, { method: 'DELETE' })
  }
};
