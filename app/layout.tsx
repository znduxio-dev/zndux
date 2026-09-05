import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://zndux.io'),
  title: 'Zndux — Find trusted services near you',
  description:
    'Find trusted food vendors, artisans, logistics and professional services around you through your preferred channel.',
  icons: {
    icon: [{ url: '/zndux-brand-logo.jpeg', type: 'image/jpeg' }],
    shortcut: '/zndux-brand-logo.jpeg',
    apple: '/zndux-brand-logo.jpeg',
  },
  openGraph: {
    title: 'Zndux — What do you need nearby?',
    description: 'Find trusted local services with Zndux.',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'What do you need nearby? Find trusted local services with Zndux.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zndux — What do you need nearby?',
    description: 'Find trusted local services with Zndux.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
