import Link from 'next/link';
import { notFound } from 'next/navigation';
import { periods, getPeriodById, getArticleById } from '@/lib/data';
import { assetUrl } from '@/lib/utils';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string; articleId: string }>;
}

export async function generateStaticParams() {
  return periods.flatMap((period) =>
    period.articles.map((article) => ({
      id: period.id,
      articleId: article.id,
    }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id, articleId } = await params;
  const article = getArticleById(id, articleId);
  const period = getPeriodById(id);
  if (!article || !period) return {};
  return {
    title: `${article.title} - ${period.name}`,
    description: article.summary,
  };
}

const typeLabelMap: Record<string, string> = {
  article: '文章',
  speech: '讲话',
  letter: '书信',
  directive: '指示',
};

export default async function ArticlePage({ params }: PageProps) {
  const { id, articleId } = await params;
  const period = getPeriodById(id);
  const article = getArticleById(id, articleId);

  if (!period || !article) return notFound();

  const periodArticles = period.articles;
  const currentIndex = periodArticles.findIndex((a) => a.id === articleId);
  const prevArticle = currentIndex > 0 ? periodArticles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex < periodArticles.length - 1 ? periodArticles[currentIndex + 1] : null;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section
        className="relative py-16 md:py-20"
        style={{ backgroundColor: period.color }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${assetUrl('/hero-bg.jpeg')})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-white">
          <Link
            href={`/period/${period.id}`}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> 返回{period.shortName}
          </Link>
          <div className="mb-3 flex items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
              {period.shortName} · {period.years}
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-white/10 text-white/90">
              {typeLabelMap[article.type] || '文章'}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold poem-text">{article.title}</h1>
          <p className="text-white/70 mt-3 text-lg">写于 {article.year} 年</p>
        </div>
      </section>

      {/* Article Content */}
      <section className="max-w-3xl mx-auto px-4 py-12 md:py-16">
        <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-sm">
          <div className="prose prose-lg max-w-none">
            {article.content.split('\n\n').map((paragraph, i) => (
              <p
                key={i}
                className="text-foreground leading-loose text-base md:text-lg mb-6 last:mb-0"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Background Info */}
      {article.background && (
        <section className="max-w-3xl mx-auto px-4 pb-8">
          <div className="bg-secondary/50 rounded-xl p-6 md:p-8">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span
                className="w-1 h-5 rounded-full"
                style={{ backgroundColor: period.color }}
              />
              写作背景
            </h2>
            <p className="text-muted-foreground leading-relaxed">{article.background}</p>
          </div>
        </section>
      )}

      {/* Navigation between articles */}
      <section className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between border-t border-border pt-6">
          {prevArticle ? (
            <Link
              href={`/period/${period.id}/article/${prevArticle.id}`}
              className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <div>
                <p className="text-xs">上一篇</p>
                <p className="text-sm font-medium">{prevArticle.title}</p>
              </div>
            </Link>
          ) : (
            <div />
          )}
          <Link
            href={`/period/${period.id}`}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            查看全部文章
          </Link>
          {nextArticle ? (
            <Link
              href={`/period/${period.id}/article/${nextArticle.id}`}
              className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-right"
            >
              <div>
                <p className="text-xs">下一篇</p>
                <p className="text-sm font-medium">{nextArticle.title}</p>
              </div>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>

      {/* Other articles in this period */}
      {periodArticles.length > 1 && (
        <section className="max-w-3xl mx-auto px-4 pb-12">
          <h3 className="text-lg font-bold mb-4">同期其他文章</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {periodArticles
              .filter((a) => a.id !== articleId)
              .map((a) => (
                <Link
                  key={a.id}
                  href={`/period/${period.id}/article/${a.id}`}
                  className="group block rounded-lg border border-border bg-card p-4 transition-all hover:shadow-md hover:border-primary/30"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium group-hover:text-primary transition-colors">
                      {a.title}
                    </h4>
                    <span className="text-xs text-muted-foreground shrink-0">{a.year}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {a.summary}
                  </p>
                </Link>
              ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-border bg-card py-6">
        <div className="max-w-6xl mx-auto px-4 text-center text-muted-foreground text-sm">
          <p className="poem-text text-base mb-1">数风流人物，还看今朝</p>
          <p>本站仅供学习研究使用</p>
        </div>
      </footer>
    </div>
  );
}
