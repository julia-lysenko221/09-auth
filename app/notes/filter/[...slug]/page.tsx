import NotesClient from './Notes.client';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === 'all' ? undefined : slug[0];

  return {
    title: `Notes tag: ${tag}`,
    description: `Browse notes filtered by: ${tag} in NoteHub.`,

    openGraph: {
      title: `Notes tag: ${tag}`,
      description: `Browse notes filtered by: ${tag} in NoteHub.`,
      url: `http://localhost:3000/notes/filter/${tag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub Filtered Notes',
        },
      ],
    },
  };
}

const NotesByTags = async ({ params }: Props) => {
  const { slug } = await params;

  const tag = slug[0] === 'all' ? undefined : slug[0];

  return <NotesClient tag={tag || 'All'} />;
};

export default NotesByTags;
