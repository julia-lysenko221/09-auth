'use client';

import css from './NoteForm.module.css';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useNoteDraftStore } from '@/lib/store/noteStore';

import type { NoteTag, NewNoteData } from '../../types/note';
import { createNote } from '@/lib/api';

export default function NoteForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const { mutate, isPending } = useMutation({
    mutationFn: (noteData: NewNoteData) => createNote(noteData),
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      router.back();
    },
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as {
      title: string;
      content: string;
      tag: NoteTag;
    };
    mutate(values);
  };

  const handleCancel = () => router.push('/notes/filter/all');

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          defaultValue={draft.title}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          onChange={handleChange}
          defaultValue={draft.content}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          name="tag"
          className={css.select}
          onChange={handleChange}
          defaultValue={draft.tag}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          Create note
        </button>
      </div>
    </form>
  );
}
