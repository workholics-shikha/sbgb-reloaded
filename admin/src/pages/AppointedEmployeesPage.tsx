import CrudPage, { Column, FormField } from '@/components/CrudPage';
import { useCrud } from '@/hooks/useCrud';
import type { AppointedEmployee } from '@/lib/types';

const columns: Column<AppointedEmployee>[] = [
  { key: 'name', label: 'Name' },
  { key: 'position', label: 'Position' },
  { key: 'department', label: 'Department' },
  { key: 'appointed_date', label: 'Appointed Date' },
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
  { name: 'appointed_date', label: 'Appointed Date', type: 'date' },
  { name: 'image_url', label: 'Image URL', type: 'url' },
];

export default function AppointedEmployeesPage() {
  const { data, loading, addItem, updateItem, deleteItem } = useCrud<AppointedEmployee>('appointed_employees');
  return (
    <CrudPage
      title="Appointed Employees"
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
