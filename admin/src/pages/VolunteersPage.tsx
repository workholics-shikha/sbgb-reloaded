import CrudPage, { Column, FormField } from '@/components/CrudPage';
import { useCrud } from '@/hooks/useCrud';
import type { Volunteer } from '@/lib/types';

const columns: Column<Volunteer>[] = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'skills', label: 'Skills' },
  { key: 'joined_at', label: 'Joined' },
  {
    key: 'is_active',
    label: 'Status',
    render: (row) =>
      row.is_active ? (
        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">Active</span>
      ) : (
        <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs">Inactive</span>
      ),
  },
];

const formFields: FormField[] = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'phone', label: 'Phone', type: 'text' },
  { name: 'skills', label: 'Skills', type: 'textarea' },
  { name: 'joined_at', label: 'Joined Date', type: 'date' },
];

export default function VolunteersPage() {
  const { data, loading, addItem, updateItem, deleteItem } = useCrud<Volunteer>('volunteers');
  return (
    <CrudPage
      title="Volunteers"
      columns={columns}
      formFields={formFields}
      data={data}
      loading={loading}
      onAdd={addItem}
      onUpdate={updateItem}
      onDelete={deleteItem}
    />
  );
}
