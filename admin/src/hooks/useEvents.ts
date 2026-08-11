import { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/hooks/useSliders';
import type { EventItem } from '@/lib/types';

type EventPayload = {
  category_id: number;
  title: string;
  from_date: string;
  to_date: string;
  description: string;
  image: string;
  status: number;
};

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const headers = new Headers(options?.headers || {});
  const isFormData = typeof FormData !== 'undefined' && options?.body instanceof FormData;

  if (!isFormData && !headers.has('Content-Type')) {
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

export function useEvents() {
  const [data, setData] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchData() {
    setLoading(true);
    try {
      const rows = await request<EventItem[]>('/events');
      setData(rows);
      setError(null);
    } catch (err) {
      setData([]);
      setError(err instanceof Error ? err.message : 'Unable to load events');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function addItem(values: EventPayload) {
    await request('/events', {
      method: 'POST',
      body: JSON.stringify(values),
    });
    await fetchData();
  }

  async function updateItem(id: string, values: EventPayload) {
    await request(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(values),
    });
    await fetchData();
  }

  async function deleteItem(id: string) {
    await request(`/events/${id}`, {
      method: 'DELETE',
    });
    await fetchData();
  }

  async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    const result = await request<{ image: string; filename: string }>('/events/upload-image', {
      method: 'POST',
      body: formData,
    });

    return result.image;
  }

  return { data, loading, error, addItem, updateItem, deleteItem, uploadImage, refresh: fetchData };
}
