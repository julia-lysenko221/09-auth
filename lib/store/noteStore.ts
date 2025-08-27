import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { NewNoteData } from '@/types/note';

const initialDraft: NewNoteData = {
  title: '',
  content: '',
  tag: 'Todo',
};

type NoteDraftStore = {
  draft: NewNoteData;
  setDraft: (note: NewNoteData) => void;
  clearDraft: () => void;
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set((state) => ({
          draft: { ...state.draft, ...note },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft',
      partialize: (state) => {
        return { draft: state.draft };
      },
    },
  ),
);

export { initialDraft };
