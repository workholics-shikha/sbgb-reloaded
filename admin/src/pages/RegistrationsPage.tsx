import CrudPage, { Column, FormField } from '@/components/CrudPage';
import { useCrud } from '@/hooks/useCrud';
import type { Registration } from '@/lib/types';

const columns: Column<Registration>[] = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'registration_type', label: 'Type' },
  {
    key: 'status',
    label: 'Status',
    render: (row) => {
      const color =
        row.status === 'approved'
          ? 'bg-green-100 text-green-700'
          : row.status === 'rejected'
          ? 'bg-red-100 text-red-700'
          : 'bg-amber-100 text-amber-700';
      return <span className={`px-2 py-0.5 rounded-full text-xs ${color}`}>{row.status}</span>;
    },
  },
];

const formFields: FormField[] = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'phone', label: 'Phone', type: 'text' },
  { name: 'address', label: 'Address', type: 'textarea' },
  {
    name: 'registration_type',
    label: 'Registration Type',
    type: 'select',
    options: [
      { value: 'SBGBP', label: 'SBGBP' },
      { value: 'Student Utthan', label: 'Student Utthan' },
    ],
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'pending', label: 'Pending' },
      { value: 'approved', label: 'Approved' },
      { value: 'rejected', label: 'Rejected' },
    ],
  },
];

export default function RegistrationsPage() {
  const { data, loading, addItem, updateItem, deleteItem } = useCrud<Registration>('registrations');
  return (
    <CrudPage
      title="Registrations"
      columns={columns}
      formFields={formFields}
      data={data}
      loading={loading}
      onAdd={addItem}
      onUpdate={updateItem}
      onDelete={deleteItem}
      defaultValues={{ registration_type: 'SBGBP', status: 'pending' }}
    />
  );
}
