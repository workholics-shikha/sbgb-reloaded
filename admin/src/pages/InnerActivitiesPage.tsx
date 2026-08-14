import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, ImagePlus, Pencil, ListTree } from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '@/hooks/useSliders';
import { useActivities } from '@/hooks/useActivities';
import { useInnerActivities } from '@/hooks/useInnerActivities';

const PAGE_SIZE = 10;

function formatDisplayDateTime(value?: string | null) {
  if (!value) {
    return '-';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export default function InnerActivitiesPage() {
  const { data, loading, error } = useInnerActivities();
  const { data: activities, error: activitiesError } = useActivities();
  const [page, setPage] = useState(1);

  const uploadsBaseUrl = useMemo(() => {
    try {
      return new URL(API_BASE_URL).origin;
    } catch {
      return '';
    }
  }, []);

  const activityMap = useMemo(
    () => new Map(activities.map((activity) => [String(activity.id), activity])),
    [activities],
  );

  const stats = useMemo(() => {
    const activeCount = data.filter((item) => item.is_active).length;
    const parentCount = new Set(data.map((item) => item.activity_id).filter(Boolean)).size;

    return {
      total: data.length,
      active: activeCount,
      parents: parentCount,
    };
  }, [data]);

  const displayRows = useMemo(
    () => [...data].sort((a, b) => Number(a.id) - Number(b.id)),
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

  function resolveImageUrl(imagePath?: string | null) {
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
                    <ListTree size={18} />
                  </span>
                  <span className="text-sm font-semibold tracking-[0.2em] text-white/90 uppercase">
                    Inner Activity Management
                  </span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Inner Activities</h1>
              </div>

              <div className="relative grid grid-cols-3 gap-3 self-stretch rounded-2xl border border-white/12 bg-black/10 p-3 backdrop-blur-sm md:self-auto">
                {[
                  { label: 'Total', value: stats.total },
                  { label: 'Active', value: stats.active },
                  { label: 'Activities', value: stats.parents },
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
            {(error || activitiesError) && (
              <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error || activitiesError}
              </div>
            )}

            <div className="mb-5 flex flex-col gap-4 rounded-[24px] border border-[#d9e6dd] bg-[linear-gradient(180deg,#fcfdfc_0%,#f4f8f5_100%)] p-4 shadow-[0_12px_32px_rgba(26,71,49,0.05)] md:flex-row md:items-center md:justify-between md:p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2e7d52]">
                  Database Records
                </p>
                <h2 className="mt-1 text-2xl font-semibold text-[#1a4731]">Inner Activities</h2>
              </div>

              <Link
                to="/inner-activities/new"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#e8a317_0%,#c47d10_100%)] px-5 py-3 text-sm font-semibold text-[#173d2b] shadow-[0_14px_30px_rgba(232,163,23,0.28)] transition-transform hover:-translate-y-0.5"
              >
                <ImagePlus size={17} />
                Add New Inner Activity
              </Link>
            </div>

            <div className="overflow-hidden rounded-[24px] border border-[#d8e5dc] bg-white shadow-[0_20px_40px_rgba(26,71,49,0.05)]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1380px] border-collapse">
                  <thead>
                    <tr className="bg-[linear-gradient(180deg,#f5fbf7_0%,#edf5ef_100%)] text-left">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#1a4731]">ID</th>
                      <th className="px-4 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#1a4731]">Activity</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#1a4731]">Name</th>
                      <th className="px-4 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#1a4731]">Image</th> 
                      <th className="px-4 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#1a4731]">Created At</th>
                       
                      <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-[#1a4731]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={10} className="px-6 py-12 text-center text-sm text-[#6d8377]">
                          Loading inner activities...
                        </td>
                      </tr>
                    ) : displayRows.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="px-6 py-14 text-center">
                          <div className="mx-auto flex max-w-sm flex-col items-center">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f0f7f3] text-[#2e7d52]">
                              <ListTree size={24} />
                            </div>
                            <p className="text-base font-semibold text-[#1a4731]">No inner activities found</p>
                            <p className="mt-1 text-sm text-[#6d8377]">
                              Add a new inner activity record to start populating this table.
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      paginatedRows.map((item) => {
                        const activity = activityMap.get(item.activity_id);

                        return (
                          <tr
                            key={item.id}
                            className="border-t border-[#edf2ee] text-sm text-[#2d4a3c] transition-colors hover:bg-[#fbfdfb]"
                          >
                            <td className="px-6 py-4 font-semibold text-[#1f3f2f]">{item.id}</td>
                            <td className="px-4 py-4 text-[#52685c]">
                              <div className="max-w-[220px] px-3 py-2 text-xs">
                                {activity ? activity.name : `#${item.activity_id || '-'}`}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="max-w-[260px]">
                                <p className="font-semibold text-[#1f3f2f]">{item.name || 'Untitled inner activity'}</p>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-[#52685c]">
                              {item.image ? (
                                <div className="w-[220px] rounded-[22px] border border-[#e4ece7] bg-[#f8fbf9] p-3">
                                  <img
                                    src={resolveImageUrl(item.image)}
                                    alt={item.name || 'Inner activity image'}
                                    className="h-24 w-full rounded-2xl border border-[#dfe9e3] bg-white object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="max-w-[240px] rounded-2xl border border-[#e4ece7] bg-[#f8fbf9] px-3 py-2 text-xs">
                                  No image
                                </div>
                              )}
                            </td>
                              
                            <td className="px-4 py-4 text-[#52685c]">{formatDisplayDateTime(item.created_at)}</td>
                            
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-center gap-2">
                                <Link
                                  to={`/inner-activities/${item.id}/edit`}
                                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#2e7d52] text-white shadow-[0_10px_20px_rgba(46,125,82,0.18)] transition-transform hover:-translate-y-0.5"
                                  title="Edit"
                                >
                                  <Pencil size={16} />
                                </Link>
                              </div>
                            </td>
                          </tr>
                        );
                      })
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

    </div>
  );
}
