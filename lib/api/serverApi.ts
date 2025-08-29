import { cookies } from 'next/headers';
import { nextServer } from './api';
import { User } from '../../types/user';
import type { Note } from '../../types/note';

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};

export const getMeServer = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>(`/users/me`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotesServer = async (
  page: number,
  perPage: number,
  search: string,
  tag?: string,
): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();
  const s = search?.trim();
  const isValidTag = tag && tag !== 'All';

  const params: Record<string, string | number> = {
    page,
    perPage,
    ...(s ? { search: s } : {}),
    ...(isValidTag ? { tag: tag! } : {}),
  };

  const res = await nextServer.get<FetchNotesResponse>('/notes', {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const res = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};
