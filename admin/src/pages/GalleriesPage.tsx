import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, ImagePlus, Images, Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '@/hooks/useSliders';
import { useCategories } from '@/hooks/useCategories';
import { useGalleries } from '@/hooks/useGalleries';
import type { Gallery } from '@/lib/types';

const PAGE_SIZE = 10;

function resolveImageUrl(imagePath?: string | null) {
  if (!imagePath) return '';
  let uploadsBaseUrl = '';
  try {
    uploadsBaseUrl = new URL(API_BASE_URL).origin;
  } catch {
    uploadsBaseUrl = '';
  }
  if (/^https?:\/\//i.test(imagePath)) return imagePath;
  if (imagePath.startsWith('/')) return `${uploadsBaseUrl}${imagePath}`;
  return `${uploadsBaseUrl}/uploads/galleries/${imagePath}`;
}

export default function GalleriesPage() {
  const { data, loading, error, deleteItem } = useGalleries();
  const { data: categories, error: categoriesError } = useCategories();
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<Gallery | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const galleryCategories = useMemo(
    () =>
      categories
        .filter((category) => String(category.type || '').toLowerCase() === 'gallery')
        .map((category) => ({ value: String(category.id), label: category.name })),
    [categories],
  );
  const categoryMap = useMemo(() => new Map(galleryCategories.map((item) => [item.value, item.label])), [galleryCategories]);
  const displayRows = useMemo(() => [...data].sort((a, b) => Number(b.id) - Number(a.id)), [data]);
  const totalPages = Math.max(1, Math.ceil(displayRows.length / PAGE_SIZE));
  const paginatedRows = useMemo(() => displayRows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), [displayRows, page]);
  const stats = useMemo(() => ({ total: data.length, active: data.filter((item) => item.is_active).length, categories: new Set(data.map((item) => item.category_id).filter(Boolean)).size }), [data]);

  useEffect(() => {
    setPage((current) => Math.min(current, totalPages));
  }, [totalPages]);

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      await deleteItem(deleteTarget.id);
      setDeleteTarget(null);
      setSuccessMessage('Gallery deleted successfully');
    } catch (deleteError) {
      setFormError(deleteError instanceof Error ? deleteError.message : 'Unable to delete gallery');
    }
  }

  return (
    <div className="min-h-full bg-[linear-gradient(180deg,#f5fbf7_0%,#eef4ef_55%,#f7f3eb_100%)] px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-[28px] border border-[#d6e4db] bg-white shadow-[0_24px_70px_rgba(16,47,31,0.08)]">
          <div className="relative overflow-hidden bg-[linear-gradient(135deg,#1a4731_0%,#2e7d52_62%,#3e9b64_100%)] px-6 py-7 text-white md:px-8">
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8a317] text-[#1a4731]"><Images size={18} /></span>
                  <span className="text-sm font-semibold tracking-[0.2em] uppercase text-white/90">Gallery Management</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Galleries</h1>
              </div>
              <div className="grid grid-cols-3 gap-3 rounded-2xl border border-white/12 bg-black/10 p-3">
                {[{ label: 'Total', value: stats.total }, { label: 'Active', value: stats.active }, { label: 'Categories', value: stats.categories }].map((item) => (
                  <div key={item.label} className="rounded-2xl bg-white/8 px-4 py-3 text-center">
                    <p className="text-xl font-bold text-[#f7d77a] md:text-2xl">{item.value}</p>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.22em] text-white/70">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="p-5 md:p-7">
            {successMessage && <div className="mb-5 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{successMessage}</div>}
            {(formError || error || categoriesError) && <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{formError || error || categoriesError}</div>}
            <div className="mb-5 flex flex-col gap-4 rounded-[24px] border border-[#d9e6dd] bg-[linear-gradient(180deg,#fcfdfc_0%,#f4f8f5_100%)] p-4 shadow-[0_12px_32px_rgba(26,71,49,0.05)] md:flex-row md:items-center md:justify-between md:p-5">
              <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2e7d52]">Database Records</p><h2 className="mt-1 text-2xl font-semibold text-[#1a4731]">Gallery Items</h2></div>
              <Link to="/galleries/new" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#e8a317_0%,#c47d10_100%)] px-5 py-3 text-sm font-semibold text-[#173d2b]"><ImagePlus size={17} />Add New Gallery</Link>
            </div>
            <div className="overflow-hidden rounded-[24px] border border-[#d8e5dc] bg-white shadow-[0_20px_40px_rgba(26,71,49,0.05)]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1120px] border-collapse">
                  <thead><tr className="bg-[linear-gradient(180deg,#f5fbf7_0%,#edf5ef_100%)] text-left">{['No.', 'Image', 'Title', 'Category', 'Year', 'Status', 'Actions'].map((label) => <th key={label} className="px-4 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#1a4731]">{label}</th>)}</tr></thead>
                  <tbody>
                    {loading ? <tr><td colSpan={7} className="px-6 py-12 text-center text-sm text-[#6d8377]">Loading galleries...</td></tr> : displayRows.length === 0 ? <tr><td colSpan={7} className="px-6 py-14 text-center text-sm text-[#6d8377]">No gallery records found.</td></tr> : paginatedRows.map((item, index) => (
                      <tr key={item.id} className="border-t border-[#edf2ee] text-sm text-[#2d4a3c] hover:bg-[#fbfdfb]">
                        <td className="px-4 py-4 font-semibold text-[#1f3f2f]">{(page - 1) * PAGE_SIZE + index + 1}</td>
                        <td className="px-4 py-4">{item.image ? <img src={resolveImageUrl(item.image)} alt={item.title || 'Gallery image'} className="h-16 w-24 rounded-xl border border-[#dfe9e3] bg-white object-cover" /> : 'No image'}</td>
                        <td className="px-4 py-4 font-semibold text-[#1f3f2f]">{item.title || '-'}</td>
                        <td className="px-4 py-4">{item.category || categoryMap.get(item.category_id) || '-'}</td>
                        <td className="px-4 py-4">{item.year || '-'}</td>
                        <td className="px-4 py-4"><span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.is_active ? 'bg-[#edf6ef] text-[#2e7d52]' : 'bg-[#fff2ef] text-[#d94b3d]'}`}>{item.status === 1 ? 'Active' : 'Inactive'}</span></td>
                        <td className="px-4 py-4"><div className="flex items-center justify-center gap-2"><Link to={`/galleries/${item.id}/edit`} className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#2e7d52] text-white"><Pencil size={16} /></Link><button type="button" onClick={() => setDeleteTarget(item)} className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff2ef] text-[#d94b3d]"><Trash2 size={16} /></button></div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {!loading && displayRows.length > PAGE_SIZE && <div className="flex items-center justify-between border-t border-[#edf2ee] bg-[#f9fcfa] px-5 py-4"><p className="text-xs font-medium text-[#73887d]">Showing {(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, displayRows.length)} of {displayRows.length}</p><div className="flex items-center gap-2"><button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1} className="rounded-xl border border-[#d7e4db] bg-white p-2 text-[#496556] disabled:opacity-40"><ChevronLeft size={16} /></button><span className="rounded-xl bg-[#edf6ef] px-3 py-2 text-xs font-semibold text-[#2e7d52]">{page} / {totalPages}</span><button type="button" onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={page === totalPages} className="rounded-xl border border-[#d7e4db] bg-white p-2 text-[#496556] disabled:opacity-40"><ChevronRight size={16} /></button></div></div>}
            </div>
          </div>
        </section>
      </div>
      {deleteTarget && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b1e15]/60 p-4 backdrop-blur-sm"><div className="w-full max-w-sm rounded-[28px] border border-[#d7e4db] bg-white p-6 shadow-[0_35px_80px_rgba(8,30,20,0.28)]"><div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff2ef] text-[#d94b3d]"><Trash2 size={20} /></div><h3 className="text-lg font-semibold text-[#1a4731]">Delete Gallery</h3><p className="mt-2 text-sm leading-6 text-[#61766a]">This will remove <span className="font-semibold text-[#1f3f2f]">{deleteTarget.title}</span> from the galleries table.</p><div className="mt-6 flex gap-3"><button type="button" onClick={() => setDeleteTarget(null)} className="flex-1 rounded-2xl border border-[#d7e4db] px-4 py-3 text-sm font-medium text-[#5a6d62]">Cancel</button><button type="button" onClick={handleDelete} className="flex-1 rounded-2xl bg-[#d94b3d] px-4 py-3 text-sm font-semibold text-white">Delete</button></div></div></div>}
    </div>
  );
}
