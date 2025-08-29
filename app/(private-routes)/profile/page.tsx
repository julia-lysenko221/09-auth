import css from './ProfilePage.module.css';

import Link from 'next/link';
import Image from 'next/image';

import { getMeServer } from '@/lib/api/serverApi';

const Profile = async () => {
  const user = await getMeServer();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src="https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: your_email@example.com</p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
