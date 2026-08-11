import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, CalendarRange, ImagePlus, Pencil, Trash2, Upload, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '@/hooks/useSliders';
import { useCategories } from '@/hooks/useCategories';
import { useEvents } from '@/hooks/useEvents';
import type { EventItem } from '@/lib/types';

type EventFormValues = {
  category_id: string;
  title: string;
  from_date: string;
  to_date: string;
  description: string;
  image: string;
  status: string;
};

const PAGE_SIZE = 10;

function resolveImageUrl(imagePath?: string | null) {
  if (!imagePath) {
    return '';
  }

  let uploadsBaseUrl = '';

  try {
    uploadsBaseUrl = new URL(API_BASE_URL).origin;
  } catch {
    uploadsBaseUrl = '';
  }

  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }

  if (imagePath.startsWith('/')) {
    return `${uploadsBaseUrl}${imagePath}`;
  }

  return `${uploadsBaseUrl}/uploads/events/${imagePath}`;
}

export default function EventsPage() {
  const { data, loading, error, addItem, updateItem, deleteItem, uploadImage } = useEvents();
  const { data: categories, error: categoriesError } = useCategories();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [formValues, setFormValues] = useState<EventFormValues>({
    category_id: '',
    title: '',
    from_date: '',
    to_date: '',
    description: '',
    image: '',
    status: '1',
  });
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<EventItem | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [localPreviewUrl, setLocalPreviewUrl] = useState('');

  useEffect(() => {
    if (!selectedImageFile) {
      setLocalPreviewUrl('');
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImageFile);
    setLocalPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedImageFile]);

  const eventCategoryOptions = useMemo(
    () =>
      categories
        .filter((category) => String(category.type || '').toLowerCase() === 'event')
        .map((category) => ({
          value: String(category.id),
          label: category.name,
        })),
    [categories],
  );

  const categoryMap = useMemo(
    () => new Map(eventCategoryOptions.map((category) => [category.value, category.label])),
    [eventCategoryOptions],
  );

  const defaultCategory = eventCategoryOptions[0];

  const stats = useMemo(() => {
    const activeCount = data.filter((event) => event.is_active).length;
    const categoryCount = new Set(data.map((event) => event.category_id).filter(Boolean)).size;

    return {
      total: data.length,
      active: activeCount,
      categories: categoryCount,
    };
  }, [data]);

  const displayRows = useMemo(
    () => [...data].sort((a, b) => Number(b.id) - Number(a.id)),
    [data],
  );
  const totalPages = Math.max(1, Math.ceil(displayRows.length / PAGE_SIZE));
  const paginatedRows = useMemo(
    () => displayRows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [displayRows, page],
  );

  useEffect(() => {
    setPage((current) => Math.min(current, totalPages));
  }, [totalPages]);

  function openAdd() {
    setEditingEvent(null);
    setFormValues({
      category_id: defaultCategory?.value || '',
      title: '',
      from_date: '',
      to_date: '',
      description: '',
      image: '',
      status: '1',
    });
    setSelectedImageFile(null);
    setFormError(null);
    setSuccessMessage(null);
    setShowForm(true);
  }

  function openEdit(event: EventItem) {
    setEditingEvent(event);
    setFormValues({
      category_id: event.category_id ?? '',
      title: event.title ?? '',
      from_date: event.from_date ?? '',
      to_date: event.to_date ?? '',
      description: event.description ?? '',
      image: event.image ?? '',
      status: String(event.status ?? 1),
    });
    setSelectedImageFile(null);
    setFormError(null);
    setSuccessMessage(null);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setFormError(null);

    let imagePath = formValues.image.trim();

    try {
      if (selectedImageFile) {
        imagePath = await uploadImage(selectedImageFile);
      }

      if (!imagePath) {
        throw new Error('Please upload an image');
      }

      const payload = {
        category_id: Number(formValues.category_id),
        title: formValues.title.trim(),
        from_date: formValues.from_date.trim(),
        to_date: formValues.to_date.trim(),
        description: formValues.description.trim(),
        image: imagePath,
        status: Number(formValues.status),
      };

      if (editingEvent) {
        await updateItem(editingEvent.id, payload);
        setSuccessMessage('Event updated successfully');
      } else {
        await addItem(payload);
        setSuccessMessage('Event added successfully');
      }

      setShowForm(false);
      setSelectedImageFile(null);
    } catch (submitError) {
      setFormError(submitError instanceof Error ? submitError.message : 'Unable to save event');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) {
      return;
    }

    try {
      await deleteItem(deleteTarget.id);
      setDeleteTarget(null);
      setSuccessMessage('Event deleted successfully');
    } catch (deleteError) {
      setFormError(deleteError instanceof Error ? deleteError.message : 'Unable to delete event');
    }
  }

  const previewUrl = selectedImageFile ? localPreviewUrl : resolveImageUrl(formValues.image);

  return (
    <div className="min-h-full bg-[linear-gradient(180deg,#f5fbf7_0%,#eef4ef_55%,#f7f3eb_100%)] px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-[28px] border border-[#d6e4db] bg-white shadow-[0_24px_70px_rgba(16,47,31,0.08)]">
          <div className="relative overflow-hidden bg-[linear-gradient(135deg,#1a4731_0%,#2e7d52_62%,#3e9b64_100%)] px-6 py-7 text-white md:px-8">
            <div className="absolute inset-y-0 right-0 w-72 bg-[radial-gradient(circle_at_top_right,rgba(232,163,23,0.34),transparent_58%)]" />
            <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.1),transparent_26%),radial-gradient(circle_at_40%_90%,rgba(255,255,255,0.07),transparent_24%)]" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-sm">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8a317] text-[#1a4731] shadow-[0_10px_25px_rgba(232,163,23,0.35)]">
                    <CalendarRange size={18} />
                  </span>
                  <span className="text-sm font-semibold tracking-[0.2em] text-white/90 uppercase">
                    Event Management
                  </span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Events</h1>
                <p className="mt-3 max-w-xl text-sm leading-6 text-white/80 md:text-base">
                  Showing the live `events` table data from the `team_sbgbt` database on this page.
                </p>
              </div>

              <div className="relative grid grid-cols-3 gap-3 self-stretch rounded-2xl border border-white/12 bg-black/10 p-3 backdrop-blur-sm md:self-auto">
                {[
                  { label: 'Total', value: stats.total },
                  { label: 'Active', value: stats.active },
                  { label: 'Categories', value: stats.categories },
                ].map((item) => (
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

            {(formError || error || categoriesError) && (
              <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {formError || error || categoriesError}
              </div>
            )}

            <div className="mb-5 flex flex-col gap-4 rounded-[24px] border border-[#d9e6dd] bg-[linear-gradient(180deg,#fcfdfc_0%,#f4f8f5_100%)] p-4 shadow-[0_12px_32px_rgba(26,71,49,0.05)] md:flex-row md:items-center md:justify-between md:p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2e7d52]">
                  Database Records
                </p>
                <h2 className="mt-1 text-2xl font-semibold text-[#1a4731]">Events</h2>
              </div>

              <button
                type="button"
                onClick={openAdd}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#e8a317_0%,#c47d10_100%)] px-5 py-3 text-sm font-semibold text-[#173d2b] shadow-[0_14px_30px_rgba(232,163,23,0.28)] transition-transform hover:-translate-y-0.5"
              >
                <ImagePlus size={17} />
                Add New Event
              </button>
            </div>

            <div className="overflow-hidden rounded-[24px] border border-[#d8e5dc] bg-white shadow-[0_20px_40px_rgba(26,71,49,0.05)]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1240px] border-collapse">
                  <thead>
                    <tr className="bg-[linear-gradient(180deg,#f5fbf7_0%,#edf5ef_100%)] text-left">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#1a4731]">ID</th>
                      <th className="px-4 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#1a4731]">Image</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#1a4731]">Title</th>
                      <th className="px-4 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#1a4731]">Category</th>
                      <th className="px-4 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#1a4731]">From Date</th>
                      <th className="px-4 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#1a4731]">To Date</th>
                      <th className="px-4 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#1a4731]">Status</th>
                      <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-[#1a4731]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={8} className="px-6 py-12 text-center text-sm text-[#6d8377]">
                          Loading events...
                        </td>
                      </tr>
                    ) : displayRows.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-6 py-14 text-center">
                          <div className="mx-auto flex max-w-sm flex-col items-center">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f0f7f3] text-[#2e7d52]">
                              <CalendarRange size={24} />
                            </div>
                            <p className="text-base font-semibold text-[#1a4731]">No events found</p>
                            <p className="mt-1 text-sm text-[#6d8377]">
                              Add a new event record to start populating this table.
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      paginatedRows.map((event) => (
                        <tr
                          key={event.id}
                          className="border-t border-[#edf2ee] text-sm text-[#2d4a3c] transition-colors hover:bg-[#fbfdfb]"
                        >
                          <td className="px-6 py-4 font-semibold text-[#1f3f2f]">{event.id}</td>
                          <td className="px-4 py-4 text-[#52685c]">
                            {event.image ? (
                              <div className="w-[110px] rounded-[18px] border border-[#e4ece7] bg-[#f8fbf9] p-2">
                                <img
                                  src={resolveImageUrl(event.image)}
                                  alt={event.title || 'Event image'}
                                  className="h-16 w-full rounded-xl border border-[#dfe9e3] bg-white object-cover"
                                />
                              </div>
                            ) : (
                              <div className="max-w-[120px] rounded-2xl border border-[#e4ece7] bg-[#f8fbf9] px-3 py-2 text-xs">
                                No image
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="max-w-[320px]">
                              <p className="font-semibold text-[#1f3f2f]">{event.title || 'Untitled event'}</p>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-[#52685c]">
                            <div className="max-w-[220px] rounded-2xl border border-[#e4ece7] bg-[#f8fbf9] px-3 py-2 text-xs">
                              {event.category || categoryMap.get(event.category_id) || '-'}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-[#52685c]">{event.from_date || '-'}</td>
                          <td className="px-4 py-4 text-[#52685c]">{event.to_date || '-'}</td>
                          <td className="px-4 py-4">
                            <span
                              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                                event.is_active ? 'bg-[#edf6ef] text-[#2e7d52]' : 'bg-[#fff2ef] text-[#d94b3d]'
                              }`}
                            >
                              {event.status === 1 ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                type="button"
                                onClick={() => navigate(`/events/${event.id}`)}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#f04b8a] text-white transition-transform hover:-translate-y-0.5"
                                title="View"
                              >
                                <Eye size={16} />
                              </button>
                              <button
                                type="button"
                                onClick={() => openEdit(event)}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#2e7d52] text-white shadow-[0_10px_20px_rgba(46,125,82,0.18)] transition-transform hover:-translate-y-0.5"
                                title="Edit"
                              >
                                <Pencil size={16} />
                              </button>
                              <button
                                type="button"
                                onClick={() => setDeleteTarget(event)}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff2ef] text-[#d94b3d] transition-transform hover:-translate-y-0.5"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {!loading && displayRows.length > PAGE_SIZE && (
                <div className="flex items-center justify-between border-t border-[#edf2ee] bg-[#f9fcfa] px-5 py-4">
                  <p className="text-xs font-medium text-[#73887d]">
                    Showing {(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, displayRows.length)} of{' '}
                    {displayRows.length}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
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
                      type="button"
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
          <div className="w-full max-w-5xl overflow-hidden rounded-[28px] border border-[#d7e4db] bg-white shadow-[0_35px_80px_rgba(8,30,20,0.3)]">
            <div className="bg-[linear-gradient(135deg,#1a4731_0%,#2e7d52_100%)] px-6 py-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f0cd72]">Event Form</p>
                  <h2 className="mt-1 text-xl font-semibold">{editingEvent ? 'Edit Event' : 'Add New Event'}</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-xl border border-white/10 bg-white/10 p-2 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#456353]">Title</label>
                  <input
                    required
                    value={formValues.title}
                    onChange={(e) => setFormValues((current) => ({ ...current, title: e.target.value }))}
                    className="w-full rounded-2xl border border-[#d7e4db] px-4 py-3 text-sm text-[#1a4731] outline-none transition focus:border-[#2e7d52] focus:ring-4 focus:ring-[#2e7d52]/10"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#456353]">Category</label>
                  <select
                    required
                    value={formValues.category_id}
                    onChange={(e) => setFormValues((current) => ({ ...current, category_id: e.target.value }))}
                    className="w-full rounded-2xl border border-[#d7e4db] bg-white px-4 py-3 text-sm text-[#1a4731] outline-none transition focus:border-[#2e7d52] focus:ring-4 focus:ring-[#2e7d52]/10"
                  >
                    <option value="">Choose category</option>
                    {eventCategoryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#456353]">From Date</label>
                  <input
                    required
                    value={formValues.from_date}
                    onChange={(e) => setFormValues((current) => ({ ...current, from_date: e.target.value }))}
                    className="w-full rounded-2xl border border-[#d7e4db] px-4 py-3 text-sm text-[#1a4731] outline-none transition focus:border-[#2e7d52] focus:ring-4 focus:ring-[#2e7d52]/10"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#456353]">To Date</label>
                  <input
                    required
                    value={formValues.to_date}
                    onChange={(e) => setFormValues((current) => ({ ...current, to_date: e.target.value }))}
                    className="w-full rounded-2xl border border-[#d7e4db] px-4 py-3 text-sm text-[#1a4731] outline-none transition focus:border-[#2e7d52] focus:ring-4 focus:ring-[#2e7d52]/10"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#456353]">Image</label>
                  <label className="flex cursor-pointer items-center justify-center gap-3 rounded-[24px] border border-dashed border-[#b8cfc0] bg-[#f8fbf9] px-4 py-5 text-center transition hover:border-[#2e7d52] hover:bg-[#f2f8f4]">
                    <Upload size={18} className="text-[#2e7d52]" />
                    <div>
                      <p className="text-sm font-semibold text-[#1a4731]">
                        {selectedImageFile ? selectedImageFile.name : 'Choose an image file'}
                      </p>
                      <p className="mt-1 text-xs text-[#6d8377]">Recommended size 1200 x 800, up to 5MB</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0] ?? null;
                        setSelectedImageFile(file);
                      }}
                    />
                  </label>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#456353]">Status</label>
                  <select
                    value={formValues.status}
                    onChange={(e) => setFormValues((current) => ({ ...current, status: e.target.value }))}
                    className="w-full rounded-2xl border border-[#d7e4db] bg-white px-4 py-3 text-sm text-[#1a4731] outline-none transition focus:border-[#2e7d52] focus:ring-4 focus:ring-[#2e7d52]/10"
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
              </div>

              {(selectedImageFile || formValues.image) && (
                <div className="rounded-[24px] border border-[#d7e4db] bg-[#fbfdfb] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-[#1a4731]">Image Preview</p>
                      <p className="mt-1 break-all text-xs text-[#6d8377]">
                        {selectedImageFile ? selectedImageFile.name : formValues.image}
                      </p>
                    </div>
                    {selectedImageFile && (
                      <button
                        type="button"
                        onClick={() => setSelectedImageFile(null)}
                        className="rounded-xl border border-[#d7e4db] px-3 py-1.5 text-xs font-medium text-[#5a6d62] transition-colors hover:bg-white"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="Event preview"
                      className="mt-4 h-52 w-full rounded-2xl border border-[#e4ece7] bg-white object-cover"
                    />
                  )}
                </div>
              )}

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#456353]">Description</label>
                <textarea
                  required
                  value={formValues.description}
                  onChange={(e) => setFormValues((current) => ({ ...current, description: e.target.value }))}
                  rows={10}
                  className="w-full rounded-2xl border border-[#d7e4db] px-4 py-3 text-sm text-[#1a4731] outline-none transition focus:border-[#2e7d52] focus:ring-4 focus:ring-[#2e7d52]/10"
                />
              </div>

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
                  {saving ? 'Saving...' : editingEvent ? 'Update Event' : 'Save Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b1e15]/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-[28px] border border-[#d7e4db] bg-white p-6 shadow-[0_35px_80px_rgba(8,30,20,0.28)]">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff2ef] text-[#d94b3d]">
              <Trash2 size={20} />
            </div>
            <h3 className="text-lg font-semibold text-[#1a4731]">Delete Event</h3>
            <p className="mt-2 text-sm leading-6 text-[#61766a]">
              This will remove <span className="font-semibold text-[#1f3f2f]">{deleteTarget.title}</span> from the
              events table.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="flex-1 rounded-2xl border border-[#d7e4db] px-4 py-3 text-sm font-medium text-[#5a6d62] transition-colors hover:bg-[#f7faf8]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
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
