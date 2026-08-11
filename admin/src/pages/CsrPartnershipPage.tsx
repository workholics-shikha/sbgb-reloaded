import { useMemo, useState } from 'react';
import { Building2, ChevronLeft, ChevronRight, Mail, MapPin, Phone, User2 } from 'lucide-react';
import { useCsrForms } from '@/hooks/useCsrForms';

const PAGE_SIZE = 10;

function formatDate(value?: string | null) {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

export default function CsrPartnershipPage() {
  const { data, loading, error } = useCsrForms();
  const [page, setPage] = useState(1);

  const displayRows = useMemo(() => [...data].sort((a, b) => Number(b.id) - Number(a.id)), [data]);
  const totalPages = Math.max(1, Math.ceil(displayRows.length / PAGE_SIZE));
  const paginatedRows = useMemo(
    () => displayRows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [displayRows, page],
  );

  return (
    <div className="min-h-full bg-[linear-gradient(180deg,#f5fbf7_0%,#eef4ef_55%,#f7f3eb_100%)] px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-[28px] border border-[#d6e4db] bg-white shadow-[0_24px_70px_rgba(16,47,31,0.08)]">
          <div className="relative overflow-hidden bg-[linear-gradient(135deg,#1a4731_0%,#2e7d52_62%,#3e9b64_100%)] px-6 py-7 text-white md:px-8">
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8a317] text-[#1a4731]">
                    <Building2 size={18} />
                  </span>
                  <span className="text-sm font-semibold uppercase tracking-[0.2em] text-white/90">
                    CSR Partnership
                  </span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">CSR Form Entries</h1>
                <p className="mt-3 max-w-2xl text-sm text-white/80">
                  `csr_forms` table की entries यहां list हो रही हैं।
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 md:p-7">
            {error && (
              <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="mb-5 grid gap-4 md:grid-cols-4">
              <StatCard label="Total Entries" value={`${displayRows.length}`} icon={Building2} />
              <StatCard label="Latest Company" value={displayRows[0]?.company_name || '-'} icon={User2} />
              <StatCard label="Latest City" value={displayRows[0]?.city || '-'} icon={MapPin} />
              <StatCard label="Latest Contact" value={displayRows[0]?.mobile || '-'} icon={Phone} />
            </div>

            <div className="overflow-hidden rounded-[24px] border border-[#d8e5dc] bg-white shadow-[0_20px_40px_rgba(26,71,49,0.05)]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1500px] border-collapse">
                  <thead>
                    <tr className="bg-[linear-gradient(180deg,#f5fbf7_0%,#edf5ef_100%)] text-left">
                      {[
                        'Company',
                        'Concern Person',
                        'Mobile',
                        'Email',
                        'City',
                        'Tehsil / Block',
                        'District',
                        'State',
                        'Status',
                        'Created',
                      ].map((label) => (
                        <th
                          key={label}
                          className="px-4 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#1a4731]"
                        >
                          {label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={10} className="px-6 py-12 text-center text-sm text-[#6d8377]">
                          Loading CSR forms...
                        </td>
                      </tr>
                    ) : displayRows.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="px-6 py-14 text-center text-sm text-[#6d8377]">
                          No CSR entries found.
                        </td>
                      </tr>
                    ) : (
                      paginatedRows.map((item) => (
                        <tr
                          key={item.id}
                          className="border-t border-[#edf2ee] text-sm text-[#2d4a3c] hover:bg-[#fbfdfb]"
                        >
                          <td className="px-4 py-4 font-semibold text-[#1f3f2f]">{item.company_name || '-'}</td>
                          <td className="px-4 py-4">{item.concern_person || '-'}</td>
                          <td className="px-4 py-4">{item.mobile || '-'}</td>
                          <td className="px-4 py-4">{item.email || '-'}</td>
                          <td className="px-4 py-4">{item.city || '-'}</td>
                          <td className="px-4 py-4">{item.tehsil_block || '-'}</td>
                          <td className="px-4 py-4">{item.district || '-'}</td>
                          <td className="px-4 py-4">{item.state || '-'}</td>
                          <td className="px-4 py-4">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                item.status === 1
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {item.status === 1 ? 'Active' : `Status ${item.status}`}
                            </span>
                          </td>
                          <td className="px-4 py-4">{formatDate(item.created_at)}</td>
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
                      className="rounded-xl border border-[#d7e4db] bg-white p-2 text-[#496556] disabled:opacity-40"
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
                      className="rounded-xl border border-[#d7e4db] bg-white p-2 text-[#496556] disabled:opacity-40"
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

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof Building2;
}) {
  return (
    <div className="rounded-[20px] border border-[#d8e5dc] bg-white p-4 shadow-[0_12px_30px_rgba(26,71,49,0.04)]">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#edf6ef] text-[#2e7d52]">
          <Icon size={18} />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6b8275]">{label}</p>
          <p className="mt-1 truncate text-sm font-bold text-[#1f3f2f]">{value}</p>
        </div>
      </div>
    </div>
  );
}
