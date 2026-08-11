import { useState, useEffect, useCallback } from 'react';
import { createRecord, deleteRecord, listRecords, updateRecord } from '@/lib/dataStore';

export function useCrud<T extends { id: string; created_at: string }>(tableName: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const rows = await listRecords<T>(tableName);
    setData(rows);
    setLoading(false);
  }, [tableName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function addItem(values: Record<string, string | number | boolean>) {
    await createRecord(tableName, values);
    await fetchData();
  }

  async function updateItem(id: string, values: Record<string, string | number | boolean>) {
    await updateRecord(tableName, id, values);
    await fetchData();
  }

  async function deleteItem(id: string) {
    await deleteRecord(tableName, id);
    await fetchData();
  }

  return { data, loading, addItem, updateItem, deleteItem, refresh: fetchData };
}
