'use client';

import { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';

import css from './NotesPage.module.css';

import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import { fetchNotes } from '@/lib/api';
import toast from 'react-hot-toast';
import type { Note } from '@/types/note';
import Link from 'next/link';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface NotesClientProps {
  tag: string | undefined;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const [debouncedSearch] = useDebounce(search, 500);
  const perPage = 12;

  useEffect(() => {
    setPage(1);
  }, [tag]);

  const { data, isLoading, isError, isSuccess } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', page, debouncedSearch, tag],
    queryFn: () => fetchNotes(page, perPage, debouncedSearch, tag),

    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isSuccess && data?.notes.length === 0) {
      toast.error('No notes found for your request.');
    }
  }, [isSuccess, data]);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={setSearch} />

        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            pageCount={data.totalPages}
            onPageChange={setPage}
          />
        )}

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
