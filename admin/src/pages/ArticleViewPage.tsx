import { ArrowLeft, CalendarDays, FileText, Tag, UserRound } from 'lucide-react';
import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API_BASE_URL } from '@/hooks/useSliders';
import { useArticles } from '@/hooks/useArticles';
import { useCategories } from '@/hooks/useCategories';

function resolveImageUrl(imagePath?: string | null) {
  if (!imagePath) {
    return '';
  }

  let uploadsBaseUrl = '';

  try {
    uploadsBaseUrl = new URL(API_BASE_URL).origin;
  } catch {
    uploadsBaseUrl = '';
  }

  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }

  if (imagePath.startsWith('/')) {
    return `${uploadsBaseUrl}${imagePath}`;
  }

  return `${uploadsBaseUrl}/uploads/articles/${imagePath}`;
}

export default function ArticleViewPage() {
  const { id = '' } = useParams();
  const { data: articles, loading, error } = useArticles();
  const { data: categories } = useCategories();

  const article = useMemo(
    () => articles.find((entry) => String(entry.id) === String(id)) || null,
    [articles, id],
  );

  const categoryName = useMemo(() => {
    if (!article) {
      return '-';
    }

    return (
      article.category ||
      categories.find((category) => String(category.id) === String(article.category_id))?.name ||
      '-'
    );
  }, [article, categories]);

  return (
    <div className="min-h-full bg-[linear-gradient(180deg,#f5fbf7_0%,#eef4ef_55%,#f7f3eb_100%)] px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto max-w-6xl">
        <section className="overflow-hidden rounded-[28px] border border-[#d6e4db] bg-white shadow-[0_24px_70px_rgba(16,47,31,0.08)]">
          <div className="relative overflow-hidden bg-[linear-gradient(135deg,#1a4731_0%,#2e7d52_62%,#3e9b64_100%)] px-6 py-7 text-white md:px-8">
            <div className="absolute inset-y-0 right-0 w-72 bg-[radial-gradient(circle_at_top_right,rgba(232,163,23,0.34),transparent_58%)]" />
            <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.1),transparent_26%),radial-gradient(circle_at_40%_90%,rgba(255,255,255,0.07),transparent_24%)]" />

            <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-sm">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8a317] text-[#1a4731] shadow-[0_10px_25px_rgba(232,163,23,0.35)]">
                    <FileText size={18} />
                  </span>
                  <span className="text-sm font-semibold tracking-[0.2em] text-white/90 uppercase">
                    Article Info
                  </span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Article View</h1>
                <p className="mt-3 max-w-xl text-sm leading-6 text-white/80 md:text-base">
                  Review the saved article details on a separate page without opening a modal.
                </p>
              </div>

              <Link
                to="/articles"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/12 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/18"
              >
                <ArrowLeft size={16} />
                Back To Articles
              </Link>
            </div>
          </div>

          <div className="p-5 md:p-7">
            {loading ? (
              <div className="rounded-[24px] border border-[#d9e6dd] bg-[#f9fcfa] px-5 py-12 text-center text-sm text-[#6d8377]">
                Loading article details...
              </div>
            ) : error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
            ) : !article ? (
              <div className="rounded-[24px] border border-[#d9e6dd] bg-[#f9fcfa] px-5 py-12 text-center">
                <p className="text-lg font-semibold text-[#1a4731]">Article not found</p>
                <p className="mt-2 text-sm text-[#6d8377]">This record is missing or may have been deleted.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="rounded-[24px] border border-[#d9e6dd] bg-[linear-gradient(180deg,#fcfdfc_0%,#f4f8f5_100%)] p-5 shadow-[0_12px_32px_rgba(26,71,49,0.05)]">
                  <h2 className="text-2xl font-semibold text-[#1a4731]">{article.title || 'Untitled article'}</h2>
                  <div className="mt-5 grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-[#e4ece7] bg-white px-4 py-4">
                      <div className="flex items-center gap-2 text-[#2e7d52]">
                        <Tag size={16} />
                        <p className="text-xs font-semibold uppercase tracking-[0.16em]">Category</p>
                      </div>
                      <p className="mt-3 text-sm font-semibold text-[#1a4731]">{categoryName}</p>
                    </div>
                    <div className="rounded-2xl border border-[#e4ece7] bg-white px-4 py-4">
                      <div className="flex items-center gap-2 text-[#2e7d52]">
                        <UserRound size={16} />
                        <p className="text-xs font-semibold uppercase tracking-[0.16em]">Article Owner</p>
                      </div>
                      <p className="mt-3 text-sm font-semibold text-[#1a4731]">{article.article_owner || '-'}</p>
                    </div>
                    <div className="rounded-2xl border border-[#e4ece7] bg-white px-4 py-4">
                      <div className="flex items-center gap-2 text-[#2e7d52]">
                        <CalendarDays size={16} />
                        <p className="text-xs font-semibold uppercase tracking-[0.16em]">Article Date</p>
                      </div>
                      <p className="mt-3 text-sm font-semibold text-[#1a4731]">{article.article_date || '-'}</p>
                    </div>
                  </div>
                </div>

                {article.image && (
                  <div className="overflow-hidden rounded-[24px] border border-[#d8e5dc] bg-white p-4 shadow-[0_18px_35px_rgba(26,71,49,0.05)]">
                    <img
                      src={resolveImageUrl(article.image)}
                      alt={article.title || 'Article image'}
                      className="h-[240px] w-full rounded-[20px] border border-[#e4ece7] bg-[#fbfdfb] object-cover md:h-[360px]"
                    />
                  </div>
                )}

                <div className="rounded-[24px] border border-[#d8e5dc] bg-white p-5 shadow-[0_18px_35px_rgba(26,71,49,0.05)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6d8377]">Description</p>
                  <div
                    className="prose prose-sm mt-4 max-w-none text-[#2d4a3c]"
                    dangerouslySetInnerHTML={{ __html: article.description || '-' }}
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
