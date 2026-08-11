import { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  count: number;
  icon: ReactNode;
  color: 'green' | 'gold' | 'teal' | 'forest' | 'amber';
}

const colorMap: Record<StatCardProps['color'], string> = {
  green: '#2e7d52',
  gold: '#e8a317',
  teal: '#1a6b58',
  forest: '#1a4731',
  amber: '#c47d10',
};

export default function StatCard({ label, count, icon, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 flex items-center overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div
        className="w-20 h-20 flex-shrink-0 flex items-center justify-center"
        style={{ backgroundColor: colorMap[color] }}
      >
        <span className="text-white">{icon}</span>
      </div>
      <div className="flex-1 px-5 text-right">
        <p className="text-gray-400 text-xs mb-0.5 font-medium uppercase tracking-wide">{label}</p>
        <p className="text-gray-700 text-3xl font-light">{count.toLocaleString()}</p>
      </div>
    </div>
  );
}
