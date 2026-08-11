import CrudPage, { Column, FormField } from '@/components/CrudPage';
import { useCrud } from '@/hooks/useCrud';
import type { GuestBook } from '@/lib/types';

const columns: Column<GuestBook>[] = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'message', label: 'Message' },
  {
    key: 'is_approved',
    label: 'Approved',
    render: (row) =>
      row.is_approved ? (
        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">Approved</span>
      ) : (
        <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs">Pending</span>
      ),
  },
];

const formFields: FormField[] = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'message', label: 'Message', type: 'textarea', required: true },
];

export default function GuestBooksPage() {
  const { data, loading, addItem, updateItem, deleteItem } = useCrud<GuestBook>('guest_books');
  return (
    <CrudPage
      title="Guest Books"
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
