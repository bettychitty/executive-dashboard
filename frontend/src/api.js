const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000';

export const api = {
  // Dashboard
  getDashboard: async () => {
    const res = await fetch(`${API_BASE}/api/dashboard`);
    if (!res.ok) throw new Error('Failed to load dashboard');
    return res.json();
  },

  // Tasks
  getTasks: async () => {
    const res = await fetch(`${API_BASE}/api/tasks`);
    if (!res.ok) throw new Error('Failed to load tasks');
    return res.json();
  },

  createTask: async (task) => {
    const res = await fetch(`${API_BASE}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error('Failed to create task');
    return res.json();
  },

  updateTaskStatus: async (taskId, status) => {
    const res = await fetch(`${API_BASE}/api/tasks/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update task');
    return res.json();
  },

  // Suggestions
  getSuggestions: async () => {
    const res = await fetch(`${API_BASE}/api/import/suggestions`);
    if (!res.ok) throw new Error('Failed to load suggestions');
    return res.json();
  },

  approveSuggestion: async (suggestionId) => {
    const res = await fetch(`${API_BASE}/api/import/suggestions/${suggestionId}/approve`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to approve suggestion');
    return res.json();
  },

  dismissSuggestion: async (suggestionId) => {
    const res = await fetch(`${API_BASE}/api/import/suggestions/${suggestionId}/dismiss`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to dismiss suggestion');
    return res.json();
  },

  // Source Items
  getSourceItems: async () => {
    const res = await fetch(`${API_BASE}/api/source-items`);
    if (!res.ok) throw new Error('Failed to load source items');
    return res.json();
  },

  updateSourceItemState: async (itemId, state) => {
    const res = await fetch(`${API_BASE}/api/source-items/${itemId}/state`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state }),
    });
    if (!res.ok) throw new Error('Failed to update source item');
    return res.json();
  },
};
