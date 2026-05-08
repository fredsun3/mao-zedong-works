import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '毛泽东著作诗词录',
    template: '%s | 毛泽东著作诗词录',
  },
  description:
    '收录毛泽东同志各历史时期的言论、文章、诗词，按阶段详尽呈现伟人思想与文学成就。',
  keywords: [
    '毛泽东',
    '毛泽东诗词',
    '毛泽东著作',
    '毛泽东语录',
    '沁园春·雪',
    '七律·长征',
    '中国革命史',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased min-h-screen bg-background">{children}</body>
    </html>
  );
}
