import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ImagePlus, Save, Upload } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { API_BASE_URL } from '@/hooks/useSliders';
import { useCategories } from '@/hooks/useCategories';
import { useGalleries } from '@/hooks/useGalleries';

type GalleryFormValues = {
  category_id: string;
  title: string;
  image: string;
  year: string;
  status: string;
};

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

export default function GalleryEditorPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  const { data, loading, error, addItem, updateItem, uploadImage } = useGalleries();
  const { data: categories, error: categoriesError } = useCategories();
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [localPreviewUrl, setLocalPreviewUrl] = useState('');
  const [formValues, setFormValues] = useState<GalleryFormValues>({
    category_id: '',
    title: '',
    image: '',
    year: '',
    status: '1',
  });

  useEffect(() => {
    if (!selectedImageFile) {
      setLocalPreviewUrl('');
      return;
    }
    const objectUrl = URL.createObjectURL(selectedImageFile);
    setLocalPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImageFile]);

  const galleryCategories = useMemo(
    () =>
      categories
        .filter((category) => String(category.type || '').toLowerCase() === 'gallery')
        .map((category) => ({ value: String(category.id), label: category.name })),
    [categories],
  );

  const defaultCategory = galleryCategories[0];

  const editingItem = useMemo(
    () => data.find((item) => String(item.id) === String(id)) ?? null,
    [data, id],
  );

  useEffect(() => {
    if (loading) {
      return;
    }

    if (isEditing) {
      if (!editingItem) {
        setFormError('Selected gallery item could not be found.');
        return;
      }

      setFormValues({
        category_id: editingItem.category_id ?? '',
        title: editingItem.title ?? '',
        image: editingItem.image ?? '',
        year: editingItem.year ?? '',
        status: String(editingItem.status ?? 1),
      });
      return;
    }

    setFormValues((current) =>
      current.category_id
        ? current
        : {
            ...current,
            category_id: defaultCategory?.value || '',
            year: String(new Date().getFullYear()),
          },
    );
  }, [defaultCategory, editingItem, isEditing, loading]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setFormError(null);
    let imagePath = formValues.image.trim();

    try {
      if (selectedImageFile) imagePath = await uploadImage(selectedImageFile);
      if (!imagePath) throw new Error('Please upload an image');

      const payload = {
        category_id: Number(formValues.category_id),
        title: formValues.title.trim(),
        image: imagePath,
        year: formValues.year.trim(),
        status: Number(formValues.status),
      };

      if (isEditing && editingItem) {
        await updateItem(editingItem.id, payload);
      } else {
        await addItem(payload);
      }

      navigate('/galleries');
    } catch (submitError) {
      setFormError(submitError instanceof Error ? submitError.message : 'Unable to save gallery');
    } finally {
      setSaving(false);
    }
  }

  const previewUrl = selectedImageFile ? localPreviewUrl : resolveImageUrl(formValues.image);

  return (
    <div className="min-h-full bg-[linear-gradient(180deg,#f5fbf7_0%,#eef4ef_55%,#f7f3eb_100%)] px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto max-w-6xl">
        <section className="overflow-hidden rounded-[28px] border border-[#d6e4db] bg-white shadow-[0_24px_70px_rgba(16,47,31,0.08)]">
          <div className="relative overflow-hidden bg-[linear-gradient(135deg,#1a4731_0%,#2e7d52_62%,#3e9b64_100%)] px-6 py-7 text-white md:px-8">
            <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-sm">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8a317] text-[#1a4731] shadow-[0_10px_25px_rgba(232,163,23,0.35)]">
                    <ImagePlus size={18} />
                  </span>
                  <span className="text-sm font-semibold tracking-[0.2em] text-white/90 uppercase">
                    Gallery Editor
                  </span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  {isEditing ? 'Edit Gallery' : 'Add New Gallery'}
                </h1>
              </div>

              <Link
                to="/galleries"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white/90 backdrop-blur-sm transition hover:bg-white/15"
              >
                <ArrowLeft size={16} />
                Back to Galleries
              </Link>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 p-5 md:p-7">
            {(formError || error || categoriesError) && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {formError || error || categoriesError}
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#456353]">Title</label>
                <input
                  required
                  value={formValues.title}
                  onChange={(e) => setFormValues((current) => ({ ...current, title: e.target.value }))}
                  className="w-full rounded-2xl border border-[#d7e4db] px-4 py-3 text-sm text-[#1a4731] outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#456353]">Category</label>
                <select
                  required
                  value={formValues.category_id}
                  onChange={(e) => setFormValues((current) => ({ ...current, category_id: e.target.value }))}
                  className="w-full rounded-2xl border border-[#d7e4db] bg-white px-4 py-3 text-sm text-[#1a4731] outline-none"
                >
                  <option value="">Choose category</option>
                  {galleryCategories.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#456353]">Year</label>
                <input
                  required
                  value={formValues.year}
                  onChange={(e) => setFormValues((current) => ({ ...current, year: e.target.value }))}
                  className="w-full rounded-2xl border border-[#d7e4db] px-4 py-3 text-sm text-[#1a4731] outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#456353]">Status</label>
                <select
                  value={formValues.status}
                  onChange={(e) => setFormValues((current) => ({ ...current, status: e.target.value }))}
                  className="w-full rounded-2xl border border-[#d7e4db] bg-white px-4 py-3 text-sm text-[#1a4731] outline-none"
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#456353]">Image</label>
              <label className="flex cursor-pointer items-center justify-center gap-3 rounded-[24px] border border-dashed border-[#b8cfc0] bg-[#f8fbf9] px-4 py-5 text-center">
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
                  onChange={(e) => setSelectedImageFile(e.target.files?.[0] ?? null)}
                />
              </label>
            </div>

            {(selectedImageFile || formValues.image) && previewUrl && (
              <img
                src={previewUrl}
                alt="Gallery preview"
                className="h-52 w-full rounded-2xl border border-[#e4ece7] bg-white object-cover"
              />
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate('/galleries')}
                className="flex-1 rounded-2xl border border-[#d7e4db] px-4 py-3 text-sm font-medium text-[#5a6d62]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 rounded-2xl bg-[linear-gradient(135deg,#1a4731_0%,#2e7d52_100%)] px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
              >
                <span className="inline-flex items-center gap-2">
                  <Save size={16} />
                  {saving ? 'Saving...' : isEditing ? 'Update Gallery' : 'Save Gallery'}
                </span>
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
