import { useEffect, useMemo, useState } from 'react';
import {
  CalendarDays,
  ClipboardList,
  FileText,
  Film,
  GalleryVertical,
  GraduationCap,
  HeartHandshake,
  Landmark,
  MapPinned,
  Newspaper,
  Phone,
  Quote,
  School,
  Video,
  Zap,
} from 'lucide-react';

import StatCard from '@/components/StatCard';
import { API_BASE_URL } from '@/hooks/useSliders';
import type {
  Activity,
  Article,
  CityItem,
  ContactItem,
  CoachingOrganizationItem,
  CsrFormItem,
  EventItem,
  Gallery,
  MediaItem,
  Patrika,
  SammanSamarohRegistrationItem,
  SbgbpRegistrationItem,
  StateItem,
  Story,
  TestimonialItem,
  UtthanCoachingRegistrationItem,
  Video as VideoItem,
} from '@/lib/types';

type DashboardData = {
  activities: Activity[];
  events: EventItem[];
  articles: Article[];
  patrika: Patrika[];
  stories: Story[];
  media: MediaItem[];
  videos: VideoItem[];
  galleries: Gallery[];
  contacts: ContactItem[];
  csrForms: CsrFormItem[];
  testimonials: TestimonialItem[];
  states: StateItem[];
  cities: CityItem[];
  coachingOrganizations: CoachingOrganizationItem[];
  utthanRegistrations: UtthanCoachingRegistrationItem[];
  sbgbpRegistrations: SbgbpRegistrationItem[];
  sammanRegistrations: SammanSamarohRegistrationItem[];
};

type Counts = {
  activities: number;
  events: number;
  articles: number;
  patrika: number;
  stories: number;
  media: number;
  videos: number;
  galleries: number;
  contacts: number;
  csrForms: number;
  testimonials: number;
  states: number;
  cities: number;
  coachingOrganizations: number;
  utthanRegistrations: number;
  sbgbpRegistrations: number;
  sammanRegistrations: number;
};

const initialDashboardData: DashboardData = {
  activities: [],
  events: [],
  articles: [],
  patrika: [],
  stories: [],
  media: [],
  videos: [],
  galleries: [],
  contacts: [],
  csrForms: [],
  testimonials: [],
  states: [],
  cities: [],
  coachingOrganizations: [],
  utthanRegistrations: [],
  sbgbpRegistrations: [],
  sammanRegistrations: [],
};

const initialCounts: Counts = {
  activities: 0,
  events: 0,
  articles: 0,
  patrika: 0,
  stories: 0,
  media: 0,
  videos: 0,
  galleries: 0,
  contacts: 0,
  csrForms: 0,
  testimonials: 0,
  states: 0,
  cities: 0,
  coachingOrganizations: 0,
  utthanRegistrations: 0,
  sbgbpRegistrations: 0,
  sammanRegistrations: 0,
};

type StatColor = 'green' | 'gold' | 'teal' | 'forest' | 'amber';

type CardConfig = {
  label: string;
  key: keyof Counts;
  color: StatColor;
  icon: React.ReactNode;
};

const cards: CardConfig[] = [
  { label: 'Activities', key: 'activities', color: 'green', icon: <Zap size={36} /> },
  { label: 'Events', key: 'events', color: 'gold', icon: <CalendarDays size={36} /> },
  { label: 'Articles', key: 'articles', color: 'teal', icon: <FileText size={36} /> },
  { label: 'Patrika', key: 'patrika', color: 'forest', icon: <Newspaper size={36} /> },
  { label: 'Stories', key: 'stories', color: 'amber', icon: <FileText size={36} /> },
  { label: 'Media', key: 'media', color: 'gold', icon: <Film size={36} /> },
  { label: 'Videos', key: 'videos', color: 'teal', icon: <Video size={36} /> },
  { label: 'Galleries', key: 'galleries', color: 'forest', icon: <GalleryVertical size={36} /> },
  { label: 'Contacts', key: 'contacts', color: 'green', icon: <Phone size={36} /> },
  { label: 'CSR Forms', key: 'csrForms', color: 'amber', icon: <HeartHandshake size={36} /> },
  { label: 'Testimonials', key: 'testimonials', color: 'teal', icon: <Quote size={36} /> },
  { label: 'States', key: 'states', color: 'forest', icon: <MapPinned size={36} /> },
  { label: 'Cities', key: 'cities', color: 'green', icon: <MapPinned size={36} /> },
  { label: 'Coaching Orgs', key: 'coachingOrganizations', color: 'gold', icon: <School size={36} /> },
  { label: 'Utthan Registrations', key: 'utthanRegistrations', color: 'teal', icon: <GraduationCap size={36} /> },
  { label: 'SBGBP Registrations', key: 'sbgbpRegistrations', color: 'forest', icon: <Landmark size={36} /> },
  { label: 'Samman Registrations', key: 'sammanRegistrations', color: 'amber', icon: <ClipboardList size={36} /> },
];

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.message || 'Request failed');
  }

  return response.json() as Promise<T>;
}

function formatDate(value?: string | null) {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData>(initialDashboardData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function fetchDashboard() {
      setLoading(true);
      try {
        const [
          activities,
          events,
          articles,
          patrika,
          stories,
          media,
          videos,
          galleries,
          contacts,
          csrForms,
          testimonials,
          states,
          cities,
          coachingOrganizations,
          utthanRegistrations,
          sbgbpRegistrations,
          sammanRegistrations,
        ] = await Promise.all([
          request<Activity[]>('/activities'),
          request<EventItem[]>('/events'),
          request<Article[]>('/articles'),
          request<Patrika[]>('/patrika'),
          request<Story[]>('/stories'),
          request<MediaItem[]>('/medias'),
          request<VideoItem[]>('/videos'),
          request<Gallery[]>('/galleries'),
          request<ContactItem[]>('/contacts'),
          request<CsrFormItem[]>('/csr-forms'),
          request<TestimonialItem[]>('/testimonials'),
          request<StateItem[]>('/states'),
          request<CityItem[]>('/cities'),
          request<CoachingOrganizationItem[]>('/coaching-organizations'),
          request<UtthanCoachingRegistrationItem[]>('/utthan-coaching-registrations'),
          request<SbgbpRegistrationItem[]>('/sbgbp-registrations'),
          request<SammanSamarohRegistrationItem[]>('/samman-samaroh-registrations'),
        ]);

        if (!active) return;

        setData({
          activities,
          events,
          articles,
          patrika,
          stories,
          media,
          videos,
          galleries,
          contacts,
          csrForms,
          testimonials,
          states,
          cities,
          coachingOrganizations,
          utthanRegistrations,
          sbgbpRegistrations,
          sammanRegistrations,
        });
        setError(null);
      } catch (fetchError) {
        if (!active) return;
        setData(initialDashboardData);
        setError(fetchError instanceof Error ? fetchError.message : 'Unable to load dashboard');
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchDashboard();
    return () => {
      active = false;
    };
  }, []);

  const counts = useMemo<Counts>(
    () => ({
      activities: data.activities.length,
      events: data.events.length,
      articles: data.articles.length,
      patrika: data.patrika.length,
      stories: data.stories.length,
      media: data.media.length,
      videos: data.videos.length,
      galleries: data.galleries.length,
      contacts: data.contacts.length,
      csrForms: data.csrForms.length,
      testimonials: data.testimonials.length,
      states: data.states.length,
      cities: data.cities.length,
      coachingOrganizations: data.coachingOrganizations.length,
      utthanRegistrations: data.utthanRegistrations.length,
      sbgbpRegistrations: data.sbgbpRegistrations.length,
      sammanRegistrations: data.sammanRegistrations.length,
    }),
    [data],
  );

  const totalRegistrations = counts.utthanRegistrations + counts.sbgbpRegistrations + counts.sammanRegistrations;

  const latestSbgbp = data.sbgbpRegistrations.slice(0, 5);
  const latestUtthan = data.utthanRegistrations.slice(0, 5);
  const latestContacts = data.contacts.slice(0, 5);

  return (
    <div className="min-h-full bg-[linear-gradient(180deg,#f5fbf7_0%,#eef4ef_55%,#f7f3eb_100%)] p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="overflow-hidden rounded-[28px] border border-[#d6e4db] bg-white shadow-[0_24px_70px_rgba(16,47,31,0.08)]">
          <div className="relative overflow-hidden bg-[linear-gradient(135deg,#1a4731_0%,#2e7d52_62%,#3e9b64_100%)] px-6 py-8 text-white md:px-8">
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2">
                  <span className="text-sm font-semibold tracking-[0.2em] uppercase text-white/90">Dynamic Dashboard</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Live admin overview</h1>
                <p className="mt-3 text-sm leading-7 text-white/80">
                  Dashboard ab admin APIs se live data fetch kar raha hai. Yahan se registrations, content modules aur incoming enquiries ka quick pulse milta hai.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <HighlightCard label="Total Registrations" value={totalRegistrations} />
                <HighlightCard label="Incoming Contacts" value={counts.contacts} />
                <HighlightCard label="CSR Enquiries" value={counts.csrForms} />
              </div>
            </div>
          </div>
        </section>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {loading
            ? Array.from({ length: cards.length }).map((_, index) => (
                <div
                  key={index}
                  className="h-20 animate-pulse rounded-lg"
                  style={{ backgroundColor: 'rgba(26,71,49,0.1)' }}
                />
              ))
            : cards.map((card, index) => (
                <StatCard
                  key={`${card.key}-${index}`}
                  label={card.label}
                  count={counts[card.key] ?? initialCounts[card.key]}
                  color={card.color}
                  icon={card.icon}
                />
              ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <RecentListCard
            title="Latest SBGBP Registrations"
            subtitle="Recent competition applications"
            loading={loading}
            emptyText="No SBGBP registrations found."
            items={latestSbgbp.map((item) => ({
              id: item.id,
              title: item.student_name || '-',
              meta: `${item.circle || '-'} • Class ${item.class || '-'}`,
              badge: item.payment_status || 'pending',
              date: formatDate(item.created_at),
            }))}
          />

          <RecentListCard
            title="Latest Utthan Registrations"
            subtitle="Recent coaching registration entries"
            loading={loading}
            emptyText="No Utthan registrations found."
            items={latestUtthan.map((item) => ({
              id: item.id,
              title: item.student_name || '-',
              meta: `${item.organization_name || '-'} • ${item.course_name || '-'}`,
              badge: item.status || 'pending',
              date: formatDate(item.created_at),
            }))}
          />

          <RecentListCard
            title="Latest Contacts"
            subtitle="Recent website contact enquiries"
            loading={loading}
            emptyText="No contacts found."
            items={latestContacts.map((item) => ({
              id: item.id,
              title: item.name || '-',
              meta: `${item.city_name || '-'} • ${item.subject || 'General enquiry'}`,
              badge: item.mobile || '-',
              date: formatDate(item.created_at),
            }))}
          />
        </div>
      </div>
    </div>
  );
}

function HighlightCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">{label}</p>
      <p className="mt-2 text-2xl font-bold text-white">{value.toLocaleString()}</p>
    </div>
  );
}

function RecentListCard({
  title,
  subtitle,
  items,
  loading,
  emptyText,
}: {
  title: string;
  subtitle: string;
  items: Array<{ id: string; title: string; meta: string; badge: string; date: string }>;
  loading: boolean;
  emptyText: string;
}) {
  return (
    <section className="overflow-hidden rounded-[28px] border border-[#d6e4db] bg-white shadow-[0_24px_70px_rgba(16,47,31,0.08)]">
      <div className="border-b border-[#edf2ee] px-6 py-5">
        <h2 className="text-lg font-semibold text-[#1a4731]">{title}</h2>
        <p className="mt-1 text-sm text-[#6d8377]">{subtitle}</p>
      </div>

      <div className="space-y-3 p-5">
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-20 animate-pulse rounded-2xl bg-[#f3f7f4]" />
          ))
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#d6e4db] bg-[#fbfdfb] px-4 py-10 text-center text-sm text-[#6d8377]">
            {emptyText}
          </div>
        ) : (
          items.map((item) => (
            <article key={item.id} className="rounded-2xl border border-[#e8efe9] bg-[#fbfdfb] p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-[#1f3f2f]">{item.title}</h3>
                  <p className="mt-1 text-sm text-[#61766a]">{item.meta}</p>
                </div>
                <span className="rounded-full bg-[#edf6ef] px-3 py-1 text-xs font-semibold text-[#2e7d52]">
                  {item.badge}
                </span>
              </div>
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-[#91a69a]">{item.date}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
