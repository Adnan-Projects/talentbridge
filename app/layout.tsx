import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TalentBridge — Unlocking Potential in Every Child',
  description:
    'TalentBridge connects talented children from disadvantaged backgrounds with the mentors, resources, and opportunities they deserve.',
  keywords: ['talent', 'children', 'disadvantaged', 'education', 'mentorship', 'social impact'],
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
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
