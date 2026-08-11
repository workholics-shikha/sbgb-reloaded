import { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/hooks/useSliders';
import type { Patrika } from '@/lib/types';

type PatrikaPayload = {
  patrika_name: string;
  patrika_year: string;
  patrika_file: string;
  status: number;
};

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const headers = new Headers(options?.headers || {});
  const isFormData = typeof FormData !== 'undefined' && options?.body instanceof FormData;

  if (!isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_BASE_URL}${path}`, { headers, ...options });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.message || 'Request failed');
  }

  return response.json() as Promise<T>;
}

export function usePatrika() {
  const [data, setData] = useState<Patrika[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchData() {
    setLoading(true);
    try {
      const rows = await request<Patrika[]>('/patrika');
      setData(rows);
      setError(null);
    } catch (err) {
      setData([]);
      setError(err instanceof Error ? err.message : 'Unable to load patrika');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function addItem(values: PatrikaPayload) {
    await request('/patrika', { method: 'POST', body: JSON.stringify(values) });
    await fetchData();
  }

  async function updateItem(id: string, values: PatrikaPayload) {
    await request(`/patrika/${id}`, { method: 'PUT', body: JSON.stringify(values) });
    await fetchData();
  }

  async function deleteItem(id: string) {
    await request(`/patrika/${id}`, { method: 'DELETE' });
    await fetchData();
  }

  async function uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const result = await request<{ file: string; filename: string }>('/patrika/upload-file', {
      method: 'POST',
      body: formData,
    });

    return result.file;
  }

  return { data, loading, error, addItem, updateItem, deleteItem, uploadFile, refresh: fetchData };
}
