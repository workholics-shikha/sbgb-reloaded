import { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/hooks/useSliders';
import type { SammanSamarohRegistrationItem } from '@/lib/types';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const headers = new Headers(options?.headers || {});
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_BASE_URL}${path}`, { headers, ...options });
  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.message || 'Request failed');
  }

  return response.json() as Promise<T>;
}

export function useSammanSamarohRegistrations() {
  const [data, setData] = useState<SammanSamarohRegistrationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchData() {
    setLoading(true);
    try {
      const rows = await request<SammanSamarohRegistrationItem[]>('/samman-samaroh-registrations');
      setData(rows);
      setError(null);
    } catch (err) {
      setData([]);
      setError(err instanceof Error ? err.message : 'Unable to load registrations');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function deleteItem(id: string) {
    await request(`/samman-samaroh-registrations/${id}`, { method: 'DELETE' });
    await fetchData();
  }

  return { data, loading, error, deleteItem, refresh: fetchData };
}
