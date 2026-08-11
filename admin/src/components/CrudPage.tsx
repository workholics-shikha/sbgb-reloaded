import { useEffect, useMemo, useState, ReactNode } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-react';

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => ReactNode;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'date' | 'number' | 'select' | 'url';
  options?: { value: string; label: string }[];
  required?: boolean;
}

interface CrudPageProps<T extends { id: string; created_at: string }> {
  title: string;
  columns: Column<T>[];
  formFields: FormField[];
  data: T[];
  loading: boolean;
  onAdd: (values: Record<string, string | number | boolean>) => Promise<void>;
  onUpdate: (id: string, values: Record<string, string | number | boolean>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  defaultValues?: Record<string, string | number | boolean>;
}

const PAGE_SIZE = 10;

export default function CrudPage<T extends { id: string; created_at: string }>({
  title,
  columns,
  formFields,
  data,
  loading,
  onAdd,
  onUpdate,
  onDelete,
  defaultValues = {},
}: CrudPageProps<T>) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editRow, setEditRow] = useState<T | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string | number | boolean>>({});
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const searchableFields = formFields
    .filter((field) => field.type === 'text' || field.type === 'textarea')
    .map((field) => field.name);

  const filtered = data.filter((row) => {
    if (!search) return true;
    return searchableFields.some((key) => {
      const value = (row as Record<string, unknown>)[key];
      return typeof value === 'string' && value.toLowerCase().includes(search.toLowerCase());
    });
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const stats = useMemo(
    () => [
      { label: 'Total Records', value: data.length },
      { label: 'Visible Results', value: filtered.length },
      { label: 'Fields', value: formFields.length },
    ],
    [data.length, filtered.length, formFields.length]
  );

  useEffect(() => {
    setPage(1);
  }, [search]);

  function openAdd() {
    const initialValues: Record<string, string | number | boolean> = {};
    formFields.forEach((field) => {
      initialValues[field.name] = defaultValues[field.name] ?? '';
    });
    setFormValues(initialValues);
    setEditRow(null);
    setFormError(null);
    setSuccessMessage(null);
    setShowForm(true);
  }

  function openEdit(row: T) {
    const initialValues: Record<string, string | number | boolean> = {};
    formFields.forEach((field) => {
      const value = (row as Record<string, unknown>)[field.name];
      initialValues[field.name] = value != null ? String(value) : '';
    });
    setFormValues(initialValues);
    setEditRow(row);
    setFormError(null);
    setSuccessMessage(null);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setFormError(null);

    try {
      if (editRow) {
        await onUpdate(editRow.id, formValues);
        setSuccessMessage(`${title} record updated successfully`);
      } else {
        await onAdd(formValues);
        setSuccessMessage(`${title} record added successfully`);
      }
      setShowForm(false);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSaving(false);
    }
  }

  async function confirmDelete(id: string) {
    setDeleteId(null);
    try {
      await onDelete(id);
      setSuccessMessage(`${title} record deleted successfully`);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to delete');
    }
  }

  return (
    <div className="min-h-full bg-[linear-gradient(180deg,#f5fbf7_0%,#eef4ef_55%,#f8f4eb_100%)] px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-[28px] border border-[#d6e4db] bg-white shadow-[0_24px_70px_rgba(16,47,31,0.08)]">
          <div className="relative overflow-hidden bg-[linear-gradient(135deg,#1a4731_0%,#2e7d52_62%,#3e9b64_100%)] px-6 py-7 text-white md:px-8">
            <div className="absolute inset-y-0 right-0 w-72 bg-[radial-gradient(circle_at_top_right,rgba(232,163,23,0.34),transparent_58%)]" />
            <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.1),transparent_26%),radial-gradient(circle_at_40%_90%,rgba(255,255,255,0.07),transparent_24%)]" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-sm">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#f0cd72]" />
                  <span className="text-sm font-semibold uppercase tracking-[0.2em] text-white/90">
                    Listing Page
                  </span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
              </div>

              <div className="grid grid-cols-3 gap-3 rounded-2xl border border-white/12 bg-black/10 p-3 backdrop-blur-sm">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl bg-white/8 px-4 py-3 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                  >
                    <p className="text-xl font-bold text-[#f7d77a] md:text-2xl">{item.value}</p>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.22em] text-white/70">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5 md:p-7">
            {successMessage && (
              <div className="mb-5 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {successMessage}
              </div>
            )}

            {formError && (
              <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {formError}
              </div>
            )}

            <div className="mb-5 flex flex-col gap-4 rounded-[24px] border border-[#d9e6dd] bg-[linear-gradient(180deg,#fcfdfc_0%,#f4f8f5_100%)] p-4 shadow-[0_12px_32px_rgba(26,71,49,0.05)] md:flex-row md:items-center md:justify-between md:p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2e7d52]">
                  Content Library
                </p>
                <h2 className="mt-1 text-2xl font-semibold text-[#1a4731]">{title}</h2>
                <p className="mt-1 text-sm text-[#5f7468]">
                  Use the listing below to maintain entries, update details, and keep content current.
                </p>
              </div>

              <button
                type="button"
                onClick={openAdd}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#e8a317_0%,#c47d10_100%)] px-5 py-3 text-sm font-semibold text-[#173d2b] shadow-[0_14px_30px_rgba(232,163,23,0.28)] transition-transform hover:-translate-y-0.5"
              >
                <Plus size={17} />
                Add New
              </button>
            </div>

            <div className="mb-5 rounded-[24px] border border-[#d8e5dc] bg-white p-4 shadow-[0_16px_34px_rgba(26,71,49,0.05)]">
              <div className="relative">
                <Search
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7d9286]"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={`Search ${title.toLowerCase()}...`}
                  className="w-full rounded-2xl border border-[#d7e4db] bg-[#f9fcfa] py-3 pl-11 pr-4 text-sm text-[#1a4731] outline-none transition focus:border-[#2e7d52] focus:ring-4 focus:ring-[#2e7d52]/10"
                />
              </div>
            </div>

            <div className="overflow-hidden rounded-[24px] border border-[#d8e5dc] bg-white shadow-[0_20px_40px_rgba(26,71,49,0.05)]">
              {loading ? (
                <div className="px-6 py-12 text-center text-sm text-[#6d8377]">Loading...</div>
              ) : filtered.length === 0 ? (
                <div className="px-6 py-14 text-center">
                  <p className="text-base font-semibold text-[#1a4731]">No records found</p>
                  <p className="mt-1 text-sm text-[#6d8377]">
                    Try another search or add a new record to get started.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] border-collapse text-sm">
                    <thead>
                      <tr className="bg-[linear-gradient(180deg,#f5fbf7_0%,#edf5ef_100%)] text-left">
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#1a4731]">
                          #
                        </th>
                        {columns.map((col) => (
                          <th
                            key={String(col.key)}
                            className="px-4 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#1a4731]"
                          >
                            {col.label}
                          </th>
                        ))}
                        <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-[#1a4731]">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginated.map((row, idx) => (
                        <tr
                          key={row.id}
                          className="border-t border-[#edf2ee] text-sm text-[#2d4a3c] transition-colors hover:bg-[#fbfdfb]"
                        >
                          <td className="px-6 py-4 font-medium text-[#688074]">
                            {(page - 1) * PAGE_SIZE + idx + 1}
                          </td>
                          {columns.map((col) => (
                            <td key={String(col.key)} className="px-4 py-4 align-middle">
                              {col.render
                                ? col.render(row)
                                : String((row as Record<string, unknown>)[String(col.key)] ?? '-')}
                            </td>
                          ))}
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => openEdit(row)}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#2e7d52] text-white shadow-[0_10px_20px_rgba(46,125,82,0.18)] transition-transform hover:-translate-y-0.5"
                                title="Edit"
                              >
                                <Pencil size={16} />
                              </button>
                              <button
                                onClick={() => setDeleteId(row.id)}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff2ef] text-[#d94b3d] transition-transform hover:-translate-y-0.5"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {!loading && filtered.length > PAGE_SIZE && (
                <div className="flex items-center justify-between border-t border-[#edf2ee] bg-[#f9fcfa] px-5 py-4">
                  <p className="text-xs font-medium text-[#73887d]">
                    Showing {(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, filtered.length)} of{' '}
                    {filtered.length}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPage((current) => Math.max(1, current - 1))}
                      disabled={page === 1}
                      className="rounded-xl border border-[#d7e4db] bg-white p-2 text-[#496556] transition disabled:opacity-40"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="rounded-xl bg-[#edf6ef] px-3 py-2 text-xs font-semibold text-[#2e7d52]">
                      {page} / {totalPages}
                    </span>
                    <button
                      onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                      disabled={page === totalPages}
                      className="rounded-xl border border-[#d7e4db] bg-white p-2 text-[#496556] transition disabled:opacity-40"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b1e15]/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl overflow-hidden rounded-[28px] border border-[#d7e4db] bg-white shadow-[0_35px_80px_rgba(8,30,20,0.3)]">
            <div className="bg-[linear-gradient(135deg,#1a4731_0%,#2e7d52_100%)] px-6 py-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f0cd72]">
                    Record Form
                  </p>
                  <h2 className="mt-1 text-xl font-semibold">
                    {editRow ? `Edit ${title}` : `Add ${title}`}
                  </h2>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="rounded-xl border border-white/10 bg-white/10 p-2 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
              {formFields.map((field) => (
                <div key={field.name}>
                  <label className="mb-1.5 block text-sm font-medium text-[#456353]">
                    {field.label}
                    {field.required && <span className="ml-1 text-[#c47d10]">*</span>}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      required={field.required}
                      value={String(formValues[field.name] ?? '')}
                      onChange={(e) => setFormValues((current) => ({ ...current, [field.name]: e.target.value }))}
                      rows={4}
                      className="w-full rounded-2xl border border-[#d7e4db] px-4 py-3 text-sm text-[#1a4731] outline-none transition focus:border-[#2e7d52] focus:ring-4 focus:ring-[#2e7d52]/10"
                    />
                  ) : field.type === 'select' ? (
                    <select
                      required={field.required}
                      value={String(formValues[field.name] ?? '')}
                      onChange={(e) => setFormValues((current) => ({ ...current, [field.name]: e.target.value }))}
                      className="w-full rounded-2xl border border-[#d7e4db] bg-white px-4 py-3 text-sm text-[#1a4731] outline-none transition focus:border-[#2e7d52] focus:ring-4 focus:ring-[#2e7d52]/10"
                    >
                      <option value="">Select...</option>
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      required={field.required}
                      value={String(formValues[field.name] ?? '')}
                      onChange={(e) => setFormValues((current) => ({ ...current, [field.name]: e.target.value }))}
                      className="w-full rounded-2xl border border-[#d7e4db] px-4 py-3 text-sm text-[#1a4731] outline-none transition focus:border-[#2e7d52] focus:ring-4 focus:ring-[#2e7d52]/10"
                    />
                  )}
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 rounded-2xl border border-[#d7e4db] px-4 py-3 text-sm font-medium text-[#5a6d62] transition-colors hover:bg-[#f7faf8]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-2xl bg-[linear-gradient(135deg,#1a4731_0%,#2e7d52_100%)] px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(26,71,49,0.22)] transition-opacity disabled:opacity-60"
                >
                  {saving ? 'Saving...' : editRow ? 'Update Record' : 'Save Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b1e15]/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-[28px] border border-[#d7e4db] bg-white p-6 shadow-[0_35px_80px_rgba(8,30,20,0.28)]">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff2ef] text-[#d94b3d]">
              <Trash2 size={20} />
            </div>
            <h3 className="text-lg font-semibold text-[#1a4731]">Delete Record</h3>
            <p className="mt-2 text-sm leading-6 text-[#61766a]">
              This action cannot be undone. Please confirm if you want to remove this entry.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 rounded-2xl border border-[#d7e4db] px-4 py-3 text-sm font-medium text-[#5a6d62] transition-colors hover:bg-[#f7faf8]"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDelete(deleteId)}
                className="flex-1 rounded-2xl bg-[#d94b3d] px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
