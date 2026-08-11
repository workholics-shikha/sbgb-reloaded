const STORAGE_PREFIX = 'sbgbt-admin:';

type StoredRecord = {
  id: string;
  created_at: string;
} & Record<string, string | number | boolean | null>;

function storageKey(tableName: string) {
  return `${STORAGE_PREFIX}${tableName}`;
}

function readTable(tableName: string): StoredRecord[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const raw = window.localStorage.getItem(storageKey(tableName));
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredRecord[]) : [];
  } catch {
    return [];
  }
}

function writeTable(tableName: string, rows: StoredRecord[]) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(storageKey(tableName), JSON.stringify(rows));
}

function cleanValues(values: Record<string, string | number | boolean>) {
  return Object.fromEntries(
    Object.entries(values).filter(([, value]) => value !== '' && value != null)
  );
}

export async function listRecords<T extends StoredRecord>(tableName: string): Promise<T[]> {
  const rows = readTable(tableName).sort((a, b) => b.created_at.localeCompare(a.created_at));
  return rows as T[];
}

export async function createRecord(
  tableName: string,
  values: Record<string, string | number | boolean>
) {
  const rows = readTable(tableName);
  const record: StoredRecord = {
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    ...cleanValues(values),
  };

  writeTable(tableName, [record, ...rows]);
}

export async function updateRecord(
  tableName: string,
  id: string,
  values: Record<string, string | number | boolean>
) {
  const rows = readTable(tableName);
  const clean = cleanValues(values);
  const nextRows = rows.map((row) => (row.id === id ? { ...row, ...clean } : row));
  writeTable(tableName, nextRows);
}

export async function deleteRecord(tableName: string, id: string) {
  const rows = readTable(tableName);
  writeTable(
    tableName,
    rows.filter((row) => row.id !== id)
  );
}

export function getTableCount(tableName: string) {
  return readTable(tableName).length;
}
