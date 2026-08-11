interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export default function PlaceholderPage({
  title,
  description = 'This section has been added to the menu and is ready for its dedicated implementation.',
}: PlaceholderPageProps) {
  return (
    <div className="p-6">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700/70 mb-3">
          Menu Added
        </p>
        <h1 className="text-2xl font-semibold text-gray-800 mb-3">{title}</h1>
        <p className="text-sm leading-6 text-gray-600">{description}</p>
      </div>
    </div>
  );
}
