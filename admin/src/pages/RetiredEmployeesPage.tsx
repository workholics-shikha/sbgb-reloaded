import CrudPage, { Column, FormField } from '@/components/CrudPage';
import { useCrud } from '@/hooks/useCrud';
import type { RetiredEmployee } from '@/lib/types';

const columns: Column<RetiredEmployee>[] = [
  { key: 'name', label: 'Name' },
  { key: 'position', label: 'Position' },
  { key: 'department', label: 'Department' },
  { key: 'retired_date', label: 'Retired Date' },
  { key: 'years_of_service', label: 'Years of Service' },
  {
    key: 'image_url',
    label: 'Image',
    render: (row) =>
      row.image_url ? (
        <img src={row.image_url} alt={row.name} className="w-12 h-12 rounded object-cover" />
      ) : (
        '—'
      ),
  },
];

const formFields: FormField[] = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'position', label: 'Position', type: 'text' },
  { name: 'department', label: 'Department', type: 'text' },
  { name: 'retired_date', label: 'Retired Date', type: 'date' },
  { name: 'years_of_service', label: 'Years of Service', type: 'number' },
  { name: 'image_url', label: 'Image URL', type: 'url' },
];

export default function RetiredEmployeesPage() {
  const { data, loading, addItem, updateItem, deleteItem } = useCrud<RetiredEmployee>('retired_employees');
  return (
    <CrudPage
      title="Retired Employees"
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
