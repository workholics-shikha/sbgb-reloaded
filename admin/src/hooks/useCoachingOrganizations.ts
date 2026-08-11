import { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/hooks/useSliders';
import type { CoachingOrganizationItem } from '@/lib/types';

type CoachingOrganizationPayload = {
  name: string;
  slug: string;
  image: string;
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

export function useCoachingOrganizations() {
  const [data, setData] = useState<CoachingOrganizationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchData() {
    setLoading(true);
    try {
      const rows = await request<CoachingOrganizationItem[]>('/coaching-organizations');
      setData(rows);
      setError(null);
    } catch (err) {
      setData([]);
      setError(err instanceof Error ? err.message : 'Unable to load coaching organizations');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function addItem(values: CoachingOrganizationPayload) {
    await request('/coaching-organizations', { method: 'POST', body: JSON.stringify(values) });
    await fetchData();
  }

  async function updateItem(id: string, values: CoachingOrganizationPayload) {
    await request(`/coaching-organizations/${id}`, { method: 'PUT', body: JSON.stringify(values) });
    await fetchData();
  }

  async function deleteItem(id: string) {
    await request(`/coaching-organizations/${id}`, { method: 'DELETE' });
    await fetchData();
  }

  async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    const result = await request<{ image: string; filename: string }>('/coaching-organizations/upload-image', {
      method: 'POST',
      body: formData,
    });

    return result.image;
  }

  return { data, loading, error, addItem, updateItem, deleteItem, uploadImage, refresh: fetchData };
}
