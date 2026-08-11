import CrudPage, { Column, FormField } from '@/components/CrudPage';
import { useCrud } from '@/hooks/useCrud';
import type { SpecialAchievement } from '@/lib/types';

const columns: Column<SpecialAchievement>[] = [
  { key: 'title', label: 'Title' },
  { key: 'recipient_name', label: 'Recipient' },
  { key: 'achieved_date', label: 'Date' },
  {
    key: 'image_url',
    label: 'Image',
    render: (row) =>
      row.image_url ? (
        <img src={row.image_url} alt={row.title} className="w-12 h-12 rounded object-cover" />
      ) : (
        '—'
      ),
  },
];

const formFields: FormField[] = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'recipient_name', label: 'Recipient Name', type: 'text' },
  { name: 'achieved_date', label: 'Achieved Date', type: 'date' },
  { name: 'image_url', label: 'Image URL', type: 'url' },
];

export default function SpecialAchievementsPage() {
  const { data, loading, addItem, updateItem, deleteItem } = useCrud<SpecialAchievement>('special_achievements');
  return (
    <CrudPage
      title="Special Achievements"
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
