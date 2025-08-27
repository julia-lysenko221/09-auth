// import Link from 'next/link';
import css from '@/app/page.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'This page cannot be found on NoteHub',

  openGraph: {
    title: `Page not found`,
    description: 'This page cannot be found on NoteHub',
    url: 'https://08-zustand-green.vercel.app/not-found',

    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub',
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
