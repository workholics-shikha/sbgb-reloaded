import { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/hooks/useSliders';
import type { Activity } from '@/lib/types';

type ActivityPayload = {
  name: string;
  description: string;
  image: string;
  cat_id: number;
  type: string;
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

export function useActivities() {
  const [data, setData] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchData() {
    setLoading(true);
    try {
      const rows = await request<Activity[]>('/activities');
      setData(rows);
      setError(null);
    } catch (err) {
      setData([]);
      setError(err instanceof Error ? err.message : 'Unable to load activities');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function addItem(values: ActivityPayload) {
    await request('/activities', {
      method: 'POST',
      body: JSON.stringify(values),
    });
    await fetchData();
  }

  async function updateItem(id: string, values: ActivityPayload) {
    await request(`/activities/${id}`, {
      method: 'PUT',
      body: JSON.stringify(values),
    });
    await fetchData();
  }

  async function deleteItem(id: string) {
    await request(`/activities/${id}`, {
      method: 'DELETE',
    });
    await fetchData();
  }

  async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    const result = await request<{ image: string; filename: string }>('/activities/upload-image', {
      method: 'POST',
      body: formData,
    });

    return result.image;
  }

  return { data, loading, error, addItem, updateItem, deleteItem, uploadImage, refresh: fetchData };
}
