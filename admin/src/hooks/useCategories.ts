import { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/hooks/useSliders';
import type { Category } from '@/lib/types';

type CategoryPayload = {
  name: string;
  type: string;
  status: string;
};

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const headers = new Headers(options?.headers || {});

  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers,
    ...options,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.message || 'Request failed');
  }

  return response.json() as Promise<T>;
}

export function useCategories() {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchData() {
    setLoading(true);
    try {
      const rows = await request<Category[]>('/categories');
      setData(rows);
      setError(null);
    } catch (err) {
      setData([]);
      setError(err instanceof Error ? err.message : 'Unable to load categories');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function addItem(values: Record<string, string | number | boolean>) {
    const payload: CategoryPayload = {
      name: String(values.name || '').trim(),
      type: String(values.type || '').trim(),
      status: String(values.status || 'active').trim(),
    };

    await request('/categories', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    await fetchData();
  }

  async function updateItem(id: string, values: Record<string, string | number | boolean>) {
    const payload: Partial<CategoryPayload> = {
      ...(values.name !== undefined ? { name: String(values.name).trim() } : {}),
      ...(values.type !== undefined ? { type: String(values.type).trim() } : {}),
      ...(values.status !== undefined ? { status: String(values.status).trim() } : {}),
    };

    await request(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    await fetchData();
  }

  async function deleteItem(id: string) {
    await request(`/categories/${id}`, {
      method: 'DELETE',
    });
    await fetchData();
  }

  return { data, loading, error, addItem, updateItem, deleteItem, refresh: fetchData };
}
