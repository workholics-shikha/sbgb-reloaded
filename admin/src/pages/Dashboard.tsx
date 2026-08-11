import { useEffect, useState } from 'react';
import { getTableCount } from '@/lib/dataStore';
import StatCard from '@/components/StatCard';
import {
  Zap, CalendarDays, FileText, BookOpen, BookMarked, Film,
  Video, MessageSquare, BookUser, Users, Images, Trophy,
  UserPlus, Armchair, Star, ClipboardList,
} from 'lucide-react';


interface Counts {
  activities: number;
  events: number;
  articles: number;
  patrika: number;
  stories: number;
  media: number;
  videos: number;
  feedbacks: number;
  guest_books: number;
  volunteers: number;
  galleries: number;
  brilliant_students: number;
  appointed_employees: number;
  retired_employees: number;
  special_achievements: number;
  registrations: number;
}

const initialCounts: Counts = {
  activities: 0, events: 0, articles: 0, patrika: 0, stories: 0,
  media: 0, videos: 0, feedbacks: 0, guest_books: 0, volunteers: 0,
  galleries: 0, brilliant_students: 0, appointed_employees: 0,
  retired_employees: 0, special_achievements: 0, registrations: 0,
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
  { label: 'Patrika', key: 'patrika', color: 'forest', icon: <BookOpen size={36} /> },
  { label: 'Stories', key: 'stories', color: 'green', icon: <BookMarked size={36} /> },
  { label: 'Media', key: 'media', color: 'gold', icon: <Film size={36} /> },
  { label: 'Videos', key: 'videos', color: 'teal', icon: <Video size={36} /> },
  { label: 'Feedbacks', key: 'feedbacks', color: 'forest', icon: <MessageSquare size={36} /> },
  { label: 'Guest Books', key: 'guest_books', color: 'green', icon: <BookUser size={36} /> },
  { label: 'Volunteers', key: 'volunteers', color: 'gold', icon: <Users size={36} /> },
  { label: 'Article Comments', key: 'feedbacks', color: 'teal', icon: <MessageSquare size={36} /> },
  { label: 'Galleries', key: 'galleries', color: 'forest', icon: <Images size={36} /> },
  { label: 'SBGBP Registration', key: 'registrations', color: 'green', icon: <ClipboardList size={36} /> },
  { label: 'Brilliant Students', key: 'brilliant_students', color: 'gold', icon: <Trophy size={36} /> },
  { label: 'Appointed Employee', key: 'appointed_employees', color: 'teal', icon: <UserPlus size={36} /> },
  { label: 'Retired Employee', key: 'retired_employees', color: 'forest', icon: <Armchair size={36} /> },
  { label: 'Special Achievement', key: 'special_achievements', color: 'amber', icon: <Star size={36} /> },
  { label: 'Student Utthan Registration', key: 'registrations', color: 'green', icon: <ClipboardList size={36} /> },
];

export default function Dashboard() {
  const [counts, setCounts] = useState<Counts>(initialCounts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCounts() {
      const tables = Object.keys(initialCounts) as (keyof Counts)[];
      const map = { ...initialCounts };
      tables.forEach((t) => {
        map[t] = getTableCount(t);
      });
      setCounts(map);
      setLoading(false);
    }
    fetchCounts();
  }, []);

  return (
    <div>
      {/* Hero banner */}
       
      {/* Stat cards */}
      <div className="p-6 pt-10">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg h-20 animate-pulse"
                style={{ backgroundColor: 'rgba(26,71,49,0.1)' }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {cards.map((card, i) => (
              <StatCard
                key={`${card.key}-${i}`}
                label={card.label}
                count={counts[card.key]}
                color={card.color}
                icon={card.icon}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
