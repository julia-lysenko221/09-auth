'use client';
import css from './EditProfilePage.module.css';
import Image from 'next/image';
import { updateMe } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

const EditProfile = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setAuth);

  async function handleAction(formData: FormData) {
    const username = formData.get('username') as string;

    if (!username.trim()) return;

    try {
      const updated = await updateMe({ username });
      setUser(updated);
      router.push('/profile');
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user?.avatar || '/default-avatar.png'}
          alt={user?.username || 'User Avatar'}
          width={120}
          height={120}
          className={css.avatar}
        />

        <form action={handleAction} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input id="username" type="text" className={css.input} />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              onClick={() => router.push('/profile')}
              type="button"
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
