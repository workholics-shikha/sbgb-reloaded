import CrudPage, { Column, FormField } from '@/components/CrudPage';
import { useCrud } from '@/hooks/useCrud';
import type { Feedback } from '@/lib/types';

const columns: Column<Feedback>[] = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'rating', label: 'Rating' },
  { key: 'message', label: 'Message' },
  {
    key: 'is_read',
    label: 'Read',
    render: (row) =>
      row.is_read ? (
        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">Read</span>
      ) : (
        <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs">Unread</span>
      ),
  },
];

const formFields: FormField[] = [
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'message', label: 'Message', type: 'textarea', required: true },
  { name: 'rating', label: 'Rating (1-5)', type: 'number' },
];

export default function FeedbacksPage() {
  const { data, loading, addItem, updateItem, deleteItem } = useCrud<Feedback>('feedbacks');
  return (
    <CrudPage
      title="Feedbacks"
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
