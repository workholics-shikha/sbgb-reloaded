import { useMemo } from 'react';
import CrudPage, { Column, FormField } from '@/components/CrudPage';
import { useCategories } from '@/hooks/useCategories';
import type { Category } from '@/lib/types';

const columns: Column<Category>[] = [
  {
    key: 'type',
    label: 'Type',
    render: (row) => (
      <span className="inline-flex rounded-full bg-[#edf6ef] px-3 py-1 text-xs font-semibold text-[#2e7d52]">
        {row.type || '-'}
      </span>
    ),
  },
  { key: 'name', label: 'Name' },
  {
    key: 'status',
    label: 'Status',
    render: (row) =>
      (row.status || '').toLowerCase() === 'active' ? (
        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">Active</span>
      ) : (
        <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs">Inactive</span>
      ),
  },
];

const fallbackCategoryTypes = ['article', 'event', 'gallery', 'media'];

export default function CategoriesPage() {
  const { data, loading, addItem, updateItem, deleteItem } = useCategories();
  const formFields = useMemo<FormField[]>(() => {
    const discoveredTypes = data
      .map((item) => String(item.type || '').trim().toLowerCase())
      .filter(Boolean);

    const uniqueTypes = Array.from(new Set([...fallbackCategoryTypes, ...discoveredTypes]));

    return [
      {
        name: 'type',
        label: 'Category Type',
        type: 'select',
        required: true,
        options: uniqueTypes.map((value) => ({
          value,
          label: value.charAt(0).toUpperCase() + value.slice(1),
        })),
      },
      { name: 'name', label: 'Category Name', type: 'text', required: true },
      {
        name: 'status',
        label: 'Status',
        type: 'select',
        options: [
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
        ],
      },
    ];
  }, [data]);

  return (
    <CrudPage
      title="Categories"
      columns={columns}
      formFields={formFields}
      data={data}
      loading={loading}
      onAdd={addItem}
      onUpdate={updateItem}
      onDelete={deleteItem}
      defaultValues={{ type: fallbackCategoryTypes[0], status: 'active' }}
    />
  );
}
