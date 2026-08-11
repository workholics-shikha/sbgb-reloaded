import { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/hooks/useSliders';
import type { TestimonialItem } from '@/lib/types';

type TestimonialPayload = {
  name: string;
  email: string;
  place: string;
  description: string;
  status: number;
};

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

export function useTestimonials() {
  const [data, setData] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchData() {
    setLoading(true);
    try {
      const rows = await request<TestimonialItem[]>('/testimonials');
      setData(rows);
      setError(null);
    } catch (err) {
      setData([]);
      setError(err instanceof Error ? err.message : 'Unable to load testimonials');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function addItem(values: TestimonialPayload) {
    await request('/testimonials', { method: 'POST', body: JSON.stringify(values) });
    await fetchData();
  }

  async function updateItem(id: string, values: TestimonialPayload) {
    await request(`/testimonials/${id}`, { method: 'PUT', body: JSON.stringify(values) });
    await fetchData();
  }

  async function deleteItem(id: string) {
    await request(`/testimonials/${id}`, { method: 'DELETE' });
    await fetchData();
  }

  return { data, loading, error, addItem, updateItem, deleteItem, refresh: fetchData };
}
