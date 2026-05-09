import Link from 'next/link';
import { notFound } from 'next/navigation';
import { periods, getPeriodById } from '@/lib/data';
import { ArrowLeft, BookOpen, Feather, Quote, ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return periods.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const period = getPeriodById(id);
  if (!period) return {};
  return {
    title: period.name,
    description: period.description.slice(0, 160),
  };
}

export default async function PeriodPage({ params }: PageProps) {
  const { id } = await params;
  const period = getPeriodById(id);
  if (!period) return notFound();

  const periodIndex = periods.findIndex((p) => p.id === id);
  const prevPeriod = periodIndex > 0 ? periods[periodIndex - 1] : null;
  const nextPeriod = periodIndex < periods.length - 1 ? periods[periodIndex + 1] : null;

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section
        className="relative py-20 md:py-28"
        style={{ backgroundColor: period.color }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(/hero-bg.jpeg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-white">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> 返回首页
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 text-white font-bold text-lg">
              {periodIndex + 1}
            </span>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold">{period.name}</h1>
              <p className="text-white/70 text-lg mt-1">{period.years}</p>
            </div>
          </div>
          <div className="flex items-center gap-6 mt-6 text-white/70">
            <div className="flex items-center gap-1.5">
              <Feather className="w-4 h-4" />
              <span>{period.poems.length} 首诗词</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              <span>{period.articles.length} 篇文章</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Quote className="w-4 h-4" />
              <span>{period.quotes.length} 条语录</span>
            </div>
          </div>
        </div>
      </section>

      {/* Period Description */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-card border border-border rounded-xl p-6 md:p-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-1 h-6 rounded-full" style={{ backgroundColor: period.color }} />
            历史概述
          </h2>
          <p className="text-muted-foreground leading-loose text-base">
            {period.description}
          </p>
        </div>
      </section>

      {/* Poems Section */}
      {period.poems.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Feather className="w-6 h-6" style={{ color: period.color }} />
            诗词作品
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {period.poems.map((poem) => (
              <Link
                key={poem.id}
                href={`/period/${period.id}/poem/${poem.id}`}
                className="group block"
              >
                <div className="rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-0.5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold poem-text group-hover:text-primary transition-colors">
                      {poem.title}
                    </h3>
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded shrink-0 ml-2">
                      {poem.year}
                    </span>
                  </div>
                  <p className="poem-text text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {poem.content}
                  </p>
                  <div className="mt-3 text-primary text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    阅读全文 <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Articles Section */}
      {period.articles.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6" style={{ color: period.color }} />
            重要文章与讲话
          </h2>
          <div className="space-y-3">
            {period.articles.map((article) => (
              <Link
                key={article.id}
                href={`/period/${period.id}/article/${article.id}`}
                className="group block"
              >
                <div className="rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5">
                  <div className="flex items-start gap-3">
                    <span
                      className="inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-medium text-white shrink-0"
                      style={{ backgroundColor: period.color }}
                    >
                      {article.type === 'speech'
                        ? '讲话'
                        : article.type === 'letter'
                          ? '书信'
                          : article.type === 'directive'
                            ? '指示'
                            : '文章'}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h3 className="text-base font-bold group-hover:text-primary transition-colors">{article.title}</h3>
                        <span className="text-xs text-muted-foreground ml-2 shrink-0">
                          {article.year}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                        {article.summary}
                      </p>
                      <div className="mt-3 text-primary text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        阅读全文 <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Quotes Section */}
      {period.quotes.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Quote className="w-6 h-6" style={{ color: period.color }} />
            经典语录
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {period.quotes.map((quote) => (
              <div
                key={quote.id}
                className="quote-border pl-5 py-4 bg-card rounded-r-xl border border-border border-l-0"
                style={{ borderLeftColor: period.color, borderLeftWidth: '3px' }}
              >
                <p className="text-base font-medium leading-relaxed">
                  &ldquo;{quote.content}&rdquo;
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  —— {quote.source}（{quote.year}）
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between border-t border-border pt-8">
          {prevPeriod ? (
            <Link
              href={`/period/${prevPeriod.id}`}
              className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <div>
                <p className="text-xs">上一时期</p>
                <p className="text-sm font-medium">{prevPeriod.shortName}</p>
              </div>
            </Link>
          ) : (
            <div />
          )}
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            返回首页
          </Link>
          {nextPeriod ? (
            <Link
              href={`/period/${nextPeriod.id}`}
              className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-right"
            >
              <div>
                <p className="text-xs">下一时期</p>
                <p className="text-sm font-medium">{nextPeriod.shortName}</p>
              </div>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>

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
