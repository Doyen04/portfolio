import type { Metadata } from 'next';
import { Instrument_Serif, DM_Sans } from 'next/font/google';
import '../styles/globals.css';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-instrument-serif',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  title: 'Ademola Opeyemi — Full-Stack Developer',
  description:
    'Junior Full-Stack Developer in Lagos, Nigeria. I build production-grade web apps with Next.js, TypeScript, and PostgreSQL.',
  keywords: [
    'Full-Stack Developer',
    'Next.js',
    'TypeScript',
    'Lagos',
    'Nigeria',
    'Junior Developer',
  ],
  openGraph: {
    title: 'Ademola Opeyemi — Full-Stack Developer',
    description:
      'Junior Full-Stack Developer in Lagos, Nigeria. I build production-grade web apps with Next.js, TypeScript, and PostgreSQL.',
    url: 'https://portfolio-doyen04.vercel.app',
    siteName: 'Ademola Opeyemi',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSerif.variable} ${dmSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
