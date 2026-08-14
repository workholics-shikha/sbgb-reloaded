import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ListTree, Save, Upload } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import CkEditorField from '@/components/CkEditorField';
import { API_BASE_URL } from '@/hooks/useSliders';
import { useActivities } from '@/hooks/useActivities';
import { useInnerActivities } from '@/hooks/useInnerActivities';

type InnerActivityFormValues = {
  activity_id: string;
  name: string;
  description: string;
  image: string;
  position: string;
  status: string;
};

function resolveImageUrl(uploadsBaseUrl: string, imagePath?: string | null) {
  if (!imagePath) {
    return '';
  }

  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }

  if (imagePath.startsWith('/')) {
    return `${uploadsBaseUrl}${imagePath}`;
  }

  return `${uploadsBaseUrl}/uploads/inner-activities/${imagePath}`;
}

export default function InnerActivityEditorPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  const { data, loading, error, addItem, updateItem, uploadImage } = useInnerActivities();
  const { data: activities, error: activitiesError } = useActivities();
  const [formValues, setFormValues] = useState<InnerActivityFormValues>({
    activity_id: '',
    name: '',
    description: '',
    image: '',
    position: '0',
    status: '1',
  });
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [localPreviewUrl, setLocalPreviewUrl] = useState('');

  const uploadsBaseUrl = useMemo(() => {
    try {
      return new URL(API_BASE_URL).origin;
    } catch {
      return '';
    }
  }, []);

  const activityOptions = useMemo(
    () =>
      activities.map((activity) => ({
        value: String(activity.id),
        label: activity.name,
      })),
    [activities],
  );

  const editingItem = useMemo(
    () => data.find((item) => String(item.id) === String(id)) ?? null,
    [data, id],
  );

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

  useEffect(() => {
    if (loading) {
      return;
    }

    if (isEditing) {
      if (!editingItem) {
        setFormError('Selected inner activity could not be found.');
        return;
      }

      setFormValues({
        activity_id: editingItem.activity_id ?? '',
        name: editingItem.name ?? '',
        description: editingItem.description ?? '',
        image: editingItem.image ?? '',
        position: String(editingItem.position ?? 0),
        status: String(editingItem.status ?? 1),
      });
      return;
    }

    const defaultActivity = activityOptions[0];
    setFormValues((current) =>
      current.activity_id
        ? current
        : {
            ...current,
            activity_id: defaultActivity?.value || '',
          },
    );
  }, [activityOptions, editingItem, isEditing, loading]);

  const previewUrl = selectedImageFile
    ? localPreviewUrl
    : resolveImageUrl(uploadsBaseUrl, formValues.image);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
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
        activity_id: Number(formValues.activity_id),
        name: formValues.name.trim(),
        description: formValues.description,
        image: imagePath,
        position: Number(formValues.position || 0),
        status: Number(formValues.status),
      };

      if (isEditing && editingItem) {
        await updateItem(editingItem.id, payload);
      } else {
        await addItem(payload);
      }

      navigate('/inner-activities');
    } catch (submitError) {
      setFormError(submitError instanceof Error ? submitError.message : 'Unable to save inner activity');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-full bg-[linear-gradient(180deg,#f5fbf7_0%,#eef4ef_55%,#f7f3eb_100%)] px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto max-w-6xl">
        <section className="overflow-hidden rounded-[28px] border border-[#d6e4db] bg-white shadow-[0_24px_70px_rgba(16,47,31,0.08)]">
          <div className="relative overflow-hidden bg-[linear-gradient(135deg,#1a4731_0%,#2e7d52_62%,#3e9b64_100%)] px-6 py-7 text-white md:px-8">
            <div className="absolute inset-y-0 right-0 w-72 bg-[radial-gradient(circle_at_top_right,rgba(232,163,23,0.34),transparent_58%)]" />
            <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-sm">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8a317] text-[#1a4731] shadow-[0_10px_25px_rgba(232,163,23,0.35)]">
                    <ListTree size={18} />
                  </span>
                  <span className="text-sm font-semibold tracking-[0.2em] text-white/90 uppercase">
                    Inner Activity Editor
                  </span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  {isEditing ? 'Edit Inner Activity' : 'Add New Inner Activity'}
                </h1>
              </div>

              <Link
                to="/inner-activities"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white/90 backdrop-blur-sm transition hover:bg-white/15"
              >
                <ArrowLeft size={16} />
                Back to Inner Activities
              </Link>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 p-5 md:p-7">
            {(formError || error || activitiesError) && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {formError || error || activitiesError}
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#456353]">Activity</label>
                <select
                  required
                  value={formValues.activity_id}
                  onChange={(e) => setFormValues((current) => ({ ...current, activity_id: e.target.value }))}
                  className="w-full rounded-2xl border border-[#d7e4db] bg-white px-4 py-3 text-sm text-[#1a4731] outline-none transition focus:border-[#2e7d52] focus:ring-4 focus:ring-[#2e7d52]/10"
                >
                  <option value="">Choose activity</option>
                  {activityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#456353]">Name</label>
                <input
                  required
                  value={formValues.name}
                  onChange={(e) => setFormValues((current) => ({ ...current, name: e.target.value }))}
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
                    <p className="mt-1 text-xs text-[#6d8377]">Recommended size 600 x 400, up to 5MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setSelectedImageFile(e.target.files?.[0] ?? null)}
                  />
                </label>
              </div>

              <div className="grid gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#456353]">Position</label>
                  <input
                    type="number"
                    min="0"
                    value={formValues.position}
                    onChange={(e) => setFormValues((current) => ({ ...current, position: e.target.value }))}
                    className="w-full rounded-2xl border border-[#d7e4db] px-4 py-3 text-sm text-[#1a4731] outline-none transition focus:border-[#2e7d52] focus:ring-4 focus:ring-[#2e7d52]/10"
                  />
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
            </div>

            {(selectedImageFile || formValues.image) && previewUrl && (
              <div className="rounded-[24px] border border-[#d7e4db] bg-[#fbfdfb] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-[#1a4731]">Image Preview</p>
                    <p className="mt-1 break-all text-xs text-[#6d8377]">
                      {selectedImageFile ? selectedImageFile.name : formValues.image}
                    </p>
                  </div>
                </div>
                <img
                  src={previewUrl}
                  alt="Inner activity preview"
                  className="mt-4 h-48 w-full rounded-2xl border border-[#e4ece7] bg-white object-cover"
                />
              </div>
            )}

            <CkEditorField
              label="Description"
              value={formValues.description}
              onChange={(nextValue) => setFormValues((current) => ({ ...current, description: nextValue }))}
            />

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate('/inner-activities')}
                className="flex-1 rounded-2xl border border-[#d7e4db] px-4 py-3 text-sm font-medium text-[#5a6d62] transition-colors hover:bg-[#f7faf8]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving || loading}
                className="flex-1 rounded-2xl bg-[linear-gradient(135deg,#1a4731_0%,#2e7d52_100%)] px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(26,71,49,0.22)] transition-opacity disabled:opacity-60"
              >
                <span className="inline-flex items-center gap-2">
                  <Save size={16} />
                  {saving ? 'Saving...' : isEditing ? 'Update Inner Activity' : 'Save Inner Activity'}
                </span>
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
