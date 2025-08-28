'use client';

import type { Note, NewNoteData } from '@/types/note';
import { nextServer } from './api';
import type { User } from '@/types/user';

// interface FetchNotesParams {
//   tag?: string;
//   page?: number;
//   perPage?: number;
//   search?: string;
// }

// interface NotesResponse {
//   data: Note[];
//   totalPages: number;
//   page: number;
//   perPage: number;
// }

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface RegisterRequest {
  password: string;
  email: string;
}

export interface LoginRequest {
  password: string;
  email: string;
}

export const fetchNotes = async (
  page: number,
  perPage: number,
  search: string,
  tag?: string,
): Promise<FetchNotesResponse> => {
  const s = search?.trim();
  const isValidTag = tag && tag !== 'All';

  const params: Record<string, string | number> = {
    page,
    perPage,
    ...(s ? { search: s } : {}),
    ...(isValidTag ? { tag: tag! } : {}),
  };

  const res = await nextServer.get<FetchNotesResponse>('/notes', { params });
  return res.data;
};

export const createNote = async (newNote: NewNoteData): Promise<Note> => {
  const res = await nextServer.post<Note>('/notes', newNote);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await nextServer.delete<Note>(`/notes/${id}`);
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
};

export const register = async (data: RegisterRequest): Promise<User> => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/auth/me');
  return data;
};
