import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, MapPinned, Pencil, Plus, Trash2, X } from 'lucide-react';
import { useCities } from '@/hooks/useCities';
import { useStates } from '@/hooks/useStates';
import type { CityItem } from '@/lib/types';

type CityFormValues = {
  city_name: string;
  state_id: string;
  event_id: string;
  testimonial_counter: string;
};

const PAGE_SIZE = 10;

export default function CityListPage() {
  const { data, loading, error, addItem, updateItem, deleteItem } = useCities();
  const { data: states } = useStates();
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<CityItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<CityItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<CityFormValues>({ city_name: '', state_id: '', event_id: '', testimonial_counter: '0' });

  const displayRows = useMemo(() => [...data].sort((a, b) => a.city_name.localeCompare(b.city_name)), [data]);
  const totalPages = Math.max(1, Math.ceil(displayRows.length / PAGE_SIZE));
  const paginatedRows = useMemo(() => displayRows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), [displayRows, page]);

  function openAdd() {
    setEditingItem(null);
    setFormValues({ city_name: '', state_id: states[0]?.id || '', event_id: '', testimonial_counter: '0' });
    setFormError(null);
    setSuccessMessage(null);
    setShowForm(true);
  }

  function openEdit(item: CityItem) {
    setEditingItem(item);
    setFormValues({
      city_name: item.city_name ?? '',
      state_id: item.state_id ?? '',
      event_id: item.event_id ?? '',
      testimonial_counter: String(item.testimonial_counter ?? 0),
    });
    setFormError(null);
    setSuccessMessage(null);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setFormError(null);
    try {
      const payload = {
        city_name: formValues.city_name.trim(),
        state_id: Number(formValues.state_id),
        event_id: formValues.event_id.trim(),
        testimonial_counter: Number(formValues.testimonial_counter || 0),
      };
      if (editingItem) {
        await updateItem(editingItem.id, payload);
        setSuccessMessage('City updated successfully');
      } else {
        await addItem(payload);
        setSuccessMessage('City added successfully');
      }
      setShowForm(false);
    } catch (submitError) {
      setFormError(submitError instanceof Error ? submitError.message : 'Unable to save city');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      await deleteItem(deleteTarget.id);
      setDeleteTarget(null);
      setSuccessMessage('City deleted successfully');
    } catch (deleteError) {
      setFormError(deleteError instanceof Error ? deleteError.message : 'Unable to delete city');
    }
  }

  return (
    <div className="min-h-full bg-[linear-gradient(180deg,#f5fbf7_0%,#eef4ef_55%,#f7f3eb_100%)] px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto max-w-6xl">
        <section className="overflow-hidden rounded-[28px] border border-[#d6e4db] bg-white shadow-[0_24px_70px_rgba(16,47,31,0.08)]">
          <div className="relative overflow-hidden bg-[linear-gradient(135deg,#1a4731_0%,#2e7d52_62%,#3e9b64_100%)] px-6 py-7 text-white md:px-8">
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8a317] text-[#1a4731]"><MapPinned size={18} /></span><span className="text-sm font-semibold tracking-[0.2em] uppercase text-white/90">Masters</span></div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Cities</h1>
              </div>
              <button type="button" onClick={openAdd} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#e8a317_0%,#c47d10_100%)] px-5 py-3 text-sm font-semibold text-[#173d2b]"><Plus size={17} />Add City</button>
            </div>
          </div>
          <div className="p-5 md:p-7">
            {successMessage && <div className="mb-5 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{successMessage}</div>}
            {(formError || error) && <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{formError || error}</div>}
            <div className="overflow-hidden rounded-[24px] border border-[#d8e5dc] bg-white shadow-[0_20px_40px_rgba(26,71,49,0.05)]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[980px] border-collapse">
                  <thead><tr className="bg-[linear-gradient(180deg,#f5fbf7_0%,#edf5ef_100%)] text-left">{['State', 'City', 'Actions'].map((label) => <th key={label} className="px-4 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#1a4731]">{label}</th>)}</tr></thead>
                  <tbody>
                    {loading ? <tr><td colSpan={3} className="px-6 py-12 text-center text-sm text-[#6d8377]">Loading cities...</td></tr> : displayRows.length === 0 ? <tr><td colSpan={3} className="px-6 py-14 text-center text-sm text-[#6d8377]">No cities found.</td></tr> : paginatedRows.map((item) => <tr key={item.id} className="border-t border-[#edf2ee] text-sm text-[#2d4a3c] hover:bg-[#fbfdfb]"><td className="px-4 py-4">{item.state_name || '-'}</td><td className="px-4 py-4 font-semibold text-[#1f3f2f]">{item.city_name}</td><td className="px-4 py-4"><div className="flex items-center justify-center gap-2"><button type="button" onClick={() => openEdit(item)} className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#2e7d52] text-white"><Pencil size={16} /></button><button type="button" onClick={() => setDeleteTarget(item)} className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff2ef] text-[#d94b3d]"><Trash2 size={16} /></button></div></td></tr>)}
                  </tbody>
                </table>
              </div>
              {!loading && displayRows.length > PAGE_SIZE && <div className="flex items-center justify-between border-t border-[#edf2ee] bg-[#f9fcfa] px-5 py-4"><p className="text-xs font-medium text-[#73887d]">Showing {(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, displayRows.length)} of {displayRows.length}</p><div className="flex items-center gap-2"><button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1} className="rounded-xl border border-[#d7e4db] bg-white p-2 text-[#496556] disabled:opacity-40"><ChevronLeft size={16} /></button><span className="rounded-xl bg-[#edf6ef] px-3 py-2 text-xs font-semibold text-[#2e7d52]">{page} / {totalPages}</span><button type="button" onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={page === totalPages} className="rounded-xl border border-[#d7e4db] bg-white p-2 text-[#496556] disabled:opacity-40"><ChevronRight size={16} /></button></div></div>}
            </div>
          </div>
        </section>
      </div>

      {showForm && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b1e15]/60 p-4 backdrop-blur-sm"><div className="w-full max-w-2xl overflow-hidden rounded-[28px] border border-[#d7e4db] bg-white shadow-[0_35px_80px_rgba(8,30,20,0.3)]"><div className="bg-[linear-gradient(135deg,#1a4731_0%,#2e7d52_100%)] px-6 py-5 text-white"><div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f0cd72]">City Form</p><h2 className="mt-1 text-xl font-semibold">{editingItem ? 'Edit City' : 'Add City'}</h2></div><button type="button" onClick={() => setShowForm(false)} className="rounded-xl border border-white/10 bg-white/10 p-2 text-white/80"><X size={18} /></button></div></div><form onSubmit={handleSubmit} className="space-y-5 px-6 py-6"><div><label className="mb-1.5 block text-sm font-medium text-[#456353]">State</label><select required value={formValues.state_id} onChange={(e) => setFormValues((current) => ({ ...current, state_id: e.target.value }))} className="w-full rounded-2xl border border-[#d7e4db] bg-white px-4 py-3 text-sm text-[#1a4731] outline-none"><option value="">Choose state</option>{states.map((state) => <option key={state.id} value={state.id}>{state.name}</option>)}</select></div><div><label className="mb-1.5 block text-sm font-medium text-[#456353]">City Name</label><input required value={formValues.city_name} onChange={(e) => setFormValues((current) => ({ ...current, city_name: e.target.value }))} className="w-full rounded-2xl border border-[#d7e4db] px-4 py-3 text-sm text-[#1a4731] outline-none" /></div><div><label className="mb-1.5 block text-sm font-medium text-[#456353]">Event ID</label><input value={formValues.event_id} onChange={(e) => setFormValues((current) => ({ ...current, event_id: e.target.value }))} className="w-full rounded-2xl border border-[#d7e4db] px-4 py-3 text-sm text-[#1a4731] outline-none" /></div><div><label className="mb-1.5 block text-sm font-medium text-[#456353]">Testimonial Counter</label><input value={formValues.testimonial_counter} onChange={(e) => setFormValues((current) => ({ ...current, testimonial_counter: e.target.value }))} className="w-full rounded-2xl border border-[#d7e4db] px-4 py-3 text-sm text-[#1a4731] outline-none" /></div><div className="flex gap-3 pt-2"><button type="button" onClick={() => setShowForm(false)} className="flex-1 rounded-2xl border border-[#d7e4db] px-4 py-3 text-sm font-medium text-[#5a6d62]">Cancel</button><button type="submit" disabled={saving} className="flex-1 rounded-2xl bg-[linear-gradient(135deg,#1a4731_0%,#2e7d52_100%)] px-4 py-3 text-sm font-semibold text-white disabled:opacity-60">{saving ? 'Saving...' : editingItem ? 'Update City' : 'Save City'}</button></div></form></div></div>}
      {deleteTarget && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b1e15]/60 p-4 backdrop-blur-sm"><div className="w-full max-w-sm rounded-[28px] border border-[#d7e4db] bg-white p-6 shadow-[0_35px_80px_rgba(8,30,20,0.28)]"><div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff2ef] text-[#d94b3d]"><Trash2 size={20} /></div><h3 className="text-lg font-semibold text-[#1a4731]">Delete City</h3><p className="mt-2 text-sm leading-6 text-[#61766a]">This will remove <span className="font-semibold text-[#1f3f2f]">{deleteTarget.city_name}</span> from the cities table.</p><div className="mt-6 flex gap-3"><button type="button" onClick={() => setDeleteTarget(null)} className="flex-1 rounded-2xl border border-[#d7e4db] px-4 py-3 text-sm font-medium text-[#5a6d62]">Cancel</button><button type="button" onClick={handleDelete} className="flex-1 rounded-2xl bg-[#d94b3d] px-4 py-3 text-sm font-semibold text-white">Delete</button></div></div></div>}
    </div>
  );
}
