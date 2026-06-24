import Link from 'next/link';
import { periods } from '@/lib/data';
import { assetUrl } from '@/lib/utils';
import { BookOpen, Feather, Quote, ChevronRight } from 'lucide-react';

export default function Home() {
  const totalPoems = periods.reduce((sum, p) => sum + p.poems.length, 0);
  const totalArticles = periods.reduce((sum, p) => sum + p.articles.length, 0);
  const totalQuotes = periods.reduce((sum, p) => sum + p.quotes.length, 0);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${assetUrl('/hero-bg.jpeg')})` }}
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-wider poem-text">
            毛泽东著作诗词录
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-4 leading-relaxed">
            收录毛泽东同志一生言论、文章与诗词，按历史阶段详尽呈现伟人思想轨迹与文学成就
          </p>
          <div className="flex items-center justify-center gap-8 mt-10 text-white/70">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{totalPoems}</div>
              <div className="text-sm mt-1">诗词</div>
            </div>
            <div className="w-px h-10 bg-white/30" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{totalArticles}</div>
              <div className="text-sm mt-1">文章</div>
            </div>
            <div className="w-px h-10 bg-white/30" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{totalQuotes}</div>
              <div className="text-sm mt-1">语录</div>
            </div>
          </div>
        </div>
      </section>

      {/* Famous Quote Banner */}
      <section className="bg-primary text-primary-foreground py-8">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <blockquote className="poem-text text-xl md:text-2xl leading-relaxed">
            &ldquo;俱往矣，数风流人物，还看今朝。&rdquo;
          </blockquote>
          <p className="text-primary-foreground/70 mt-3 text-sm">—— 《沁园春·雪》 1936年</p>
        </div>
      </section>

      {/* Periods Timeline Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">历史阶段</h2>
          <p className="text-muted-foreground text-lg">
            从少年壮志到革命征程，按八个历史时期梳理伟人一生
          </p>
        </div>

        <div className="space-y-6">
          {periods.map((period, index) => (
            <Link
              key={period.id}
              href={`/period/${period.id}`}
              className="group block"
            >
              <div
                className="relative rounded-xl border border-border bg-card p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1"
              >
                {/* Timeline indicator */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-xl" style={{ backgroundColor: period.color }} />

                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                  {/* Period number & name */}
                  <div className="flex items-center gap-4 md:w-72 shrink-0">
                    <span
                      className="flex items-center justify-center w-10 h-10 rounded-full text-white text-sm font-bold shrink-0"
                      style={{ backgroundColor: period.color }}
                    >
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {period.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">{period.years}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1 line-clamp-2 md:line-clamp-3">
                    {period.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Feather className="w-4 h-4" />
                      <span>{period.poems.length}首</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <BookOpen className="w-4 h-4" />
                      <span>{period.articles.length}篇</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Quote className="w-4 h-4" />
                      <span>{period.quotes.length}条</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors ml-2" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Poems Section */}
      <section className="bg-secondary/50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">经典诗词</h2>
            <p className="text-muted-foreground text-lg">传诵千古的壮丽诗篇</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { periodId: 'land-revolution', poemId: 'land-11', title: '沁园春·雪', year: '1936', excerpt: '北国风光，千里冰封，万里雪飘。' },
              { periodId: 'revolution', poemId: 'rev-1', title: '沁园春·长沙', year: '1925', excerpt: '独立寒秋，湘江北去，橘子洲头。' },
              { periodId: 'land-revolution', poemId: 'land-9', title: '七律·长征', year: '1935', excerpt: '红军不怕远征难，万水千山只等闲。' },
              { periodId: 'land-revolution', poemId: 'land-8', title: '忆秦娥·娄山关', year: '1935', excerpt: '雄关漫道真如铁，而今迈步从头越。' },
              { periodId: 'liberation', poemId: 'lib-1', title: '七律·人民解放军占领南京', year: '1949', excerpt: '天若有情天亦老，人间正道是沧桑。' },
              { periodId: 'socialism', poemId: 'soc-5', title: '卜算子·咏梅', year: '1961', excerpt: '待到山花烂漫时，她在丛中笑。' },
            ].map((item) => (
              <Link
                key={item.poemId}
                href={`/period/${item.periodId}/poem/${item.poemId}`}
                className="group block"
              >
                <div className="rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold poem-text group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                      {item.year}
                    </span>
                  </div>
                  <p className="poem-text text-muted-foreground leading-relaxed">
                    {item.excerpt}
                  </p>
                  <div className="mt-4 text-primary text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    阅读全文 <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Quotes Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">经典语录</h2>
          <p className="text-muted-foreground text-lg">影响深远的思想光芒</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { content: '星星之火，可以燎原。', source: '《星星之火，可以燎原》', year: '1930' },
            { content: '没有调查，没有发言权。', source: '《反对本本主义》', year: '1930' },
            { content: '实事求是。', source: '《改造我们的学习》', year: '1941' },
            { content: '为人民服务。', source: '《为人民服务》', year: '1944' },
            { content: '一万年太久，只争朝夕。', source: '《满江红·和郭沫若同志》', year: '1963' },
            { content: '为有牺牲多壮志，敢教日月换新天。', source: '《七律·到韶山》', year: '1959' },
          ].map((q, i) => (
            <div key={i} className="quote-border pl-6 py-4">
              <p className="text-lg font-medium leading-relaxed">&ldquo;{q.content}&rdquo;</p>
              <p className="text-sm text-muted-foreground mt-2">
                —— {q.source}（{q.year}）
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-muted-foreground text-sm">
          <p className="poem-text text-lg mb-2">数风流人物，还看今朝</p>
          <p>本站仅供学习研究使用，内容来源于公开发表的文献资料</p>
        </div>
      </footer>
    </div>
  );
}
