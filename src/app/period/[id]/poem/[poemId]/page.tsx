import Link from 'next/link';
import { notFound } from 'next/navigation';
import { periods, getPeriodById, getPoemById } from '@/lib/data';
import { assetUrl } from '@/lib/utils';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string; poemId: string }>;
}

export async function generateStaticParams() {
  return periods.flatMap((period) =>
    period.poems.map((poem) => ({
      id: period.id,
      poemId: poem.id,
    }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id, poemId } = await params;
  const poem = getPoemById(id, poemId);
  const period = getPeriodById(id);
  if (!poem || !period) return {};
  return {
    title: `${poem.title} - ${period.name}`,
    description: poem.content.split('\n').slice(0, 2).join(''),
  };
}

export default async function PoemPage({ params }: PageProps) {
  const { id, poemId } = await params;
  const period = getPeriodById(id);
  const poem = getPoemById(id, poemId);

  if (!period || !poem) return notFound();

  const periodPoems = period.poems;
  const currentPoemIndex = periodPoems.findIndex((p) => p.id === poemId);
  const prevPoem = currentPoemIndex > 0 ? periodPoems[currentPoemIndex - 1] : null;
  const nextPoem =
    currentPoemIndex < periodPoems.length - 1 ? periodPoems[currentPoemIndex + 1] : null;

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
          <div className="mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
              {period.shortName} · {period.years}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold poem-text">{poem.title}</h1>
          <p className="text-white/70 mt-3 text-lg">写于 {poem.year} 年</p>
        </div>
      </section>

      {/* Poem Content */}
      <section className="max-w-3xl mx-auto px-4 py-12 md:py-16">
        <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-sm">
          <div className="poem-text text-xl md:text-2xl leading-[2.5] text-center whitespace-pre-line text-foreground">
            {poem.content}
          </div>
        </div>
      </section>

      {/* Background Info */}
      {poem.background && (
        <section className="max-w-3xl mx-auto px-4 pb-8">
          <div className="bg-secondary/50 rounded-xl p-6 md:p-8">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span
                className="w-1 h-5 rounded-full"
                style={{ backgroundColor: period.color }}
              />
              创作背景
            </h2>
            <p className="text-muted-foreground leading-relaxed">{poem.background}</p>
          </div>
        </section>
      )}

      {/* Navigation between poems */}
      <section className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between border-t border-border pt-6">
          {prevPoem ? (
            <Link
              href={`/period/${period.id}/poem/${prevPoem.id}`}
              className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <div>
                <p className="text-xs">上一首</p>
                <p className="text-sm font-medium poem-text">{prevPoem.title}</p>
              </div>
            </Link>
          ) : (
            <div />
          )}
          <Link
            href={`/period/${period.id}`}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            查看全部诗词
          </Link>
          {nextPoem ? (
            <Link
              href={`/period/${period.id}/poem/${nextPoem.id}`}
              className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-right"
            >
              <div>
                <p className="text-xs">下一首</p>
                <p className="text-sm font-medium poem-text">{nextPoem.title}</p>
              </div>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>

      {/* Other poems in this period */}
      {periodPoems.length > 1 && (
        <section className="max-w-3xl mx-auto px-4 pb-12">
          <h3 className="text-lg font-bold mb-4">同期其他诗词</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {periodPoems
              .filter((p) => p.id !== poemId)
              .map((p) => (
                <Link
                  key={p.id}
                  href={`/period/${period.id}/poem/${p.id}`}
                  className="group block rounded-lg border border-border bg-card p-4 transition-all hover:shadow-md hover:border-primary/30"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium poem-text group-hover:text-primary transition-colors">
                      {p.title}
                    </h4>
                    <span className="text-xs text-muted-foreground">{p.year}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-1 poem-text">
                    {p.content.split('\n')[0]}
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
