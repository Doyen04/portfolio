import type { Metadata } from 'next';
import { Cormorant_Garamond, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import '../styles/globals.css';

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--serif',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--mono',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--sans',
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
        className={`${cormorantGaramond.variable} ${jetbrainsMono.variable} ${plusJakartaSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
