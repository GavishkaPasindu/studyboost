import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/context/ThemeContext';

export const metadata: Metadata = {
  title: {
    default: 'StudyBoost AI – Advanced AI-Powered Academic Synthesis for Students',
    template: '%s | StudyBoost AI',
  },
  description:
    'StudyBoost AI provides university students with advanced academic synthesis, automated revision decks, and topic-specific practice exams. Optimize your learning efficiency today.',
  keywords: [
    'AI Academic Synthesis',
    'Automated Revision Decks',
    'Topic-Specific Practice Exams',
    'Predictive Mock Test Generator',
    'University Learning Optimization',
    'Contextual Note Analysis',
    'Smart Academic Assistant',
  ],
  authors: [{ name: 'StudyBoost AI' }],
  openGraph: {
    type: 'website',
    siteName: 'StudyBoost AI',
    title: 'StudyBoost AI – AI-Powered Study Assistant',
    description:
      'Transform your lecture notes into summaries, flashcards, and practice questions instantly with AI.',
  },
  metadataBase: new URL('https://studyboost-ai.vercel.app'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* ── Google Analytics 4 ── Replace G-XXXXXXXXXX with your Measurement ID ── */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XXXXXXXXXX');`
        }}/> */}
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          <main style={{ paddingTop: '68px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
