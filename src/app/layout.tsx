import type { Metadata } from 'next';
import { Fraunces, IBM_Plex_Mono, Manrope } from 'next/font/google';
import '../styles/globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--serif',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--mono',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--sans',
});

export const metadata: Metadata = {
  title: 'Ademola Opeyemi — Full-Stack Developer',
  description:
    'Full-Stack And Software Developer in Lagos, Nigeria. I build production-grade software and web apps with Next.js, TypeScript, and PostgreSQL.',
  keywords: [
    'Full-Stack Developer',
    'software Engineer',
    'Web Developer',
    'reactjs',
    'Next.js',
    'TypeScript',
    'Lagos',
    'Nigeria',
    'Full-Stack Developer',
  ],
  openGraph: {
    title: 'Ademola Opeyemi — Software Developer & Full-Stack Developer',
    description:
      'Full-Stack And Software Developer in Lagos, Nigeria. I build production-grade software and  web apps with Next.js, React, TypeScript, and PostgreSQL.',
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
        className={`${fraunces.variable} ${ibmPlexMono.variable} ${manrope.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
