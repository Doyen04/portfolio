import type { Metadata } from 'next';
import { Instrument_Serif, DM_Sans, Bungee } from 'next/font/google';
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

const bungee = Bungee({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bungee',
});

export const metadata: Metadata = {
  title: 'Ademola Opeyemi — Full-Stack Developer',
  description:
    'Junior Full-Stack Developer in Lagos, Nigeria. I build production-grade software and web apps with Next.js, TypeScript, and PostgreSQL.',
  keywords: [
    'Full-Stack Developer',
    'software Engineer',
    'Web Developer',
    'reactjs',
    'Next.js',
    'TypeScript',
    'Lagos',
    'Nigeria',
    'Junior Developer',
  ],
  openGraph: {
    title: 'Ademola Opeyemi — Software Developer & Full-Stack Developer',
    description:
      'Junior Full-Stack Developer in Lagos, Nigeria. I build production-grade software and  web apps with Next.js, React, TypeScript, and PostgreSQL.',
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
        className={`${instrumentSerif.variable} ${dmSans.variable} ${bungee.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
