'use client';

import { memo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/services/auth';

import { useAuth } from 'contexts/auth';
import Button from 'ui/Button/Button';
import UserAvatar from 'ui/UserAvatar/UserAvatar';

function Header() {
  const [loading, setLoading] = useState(false);
  const { firestoreUser } = useAuth();
  const { push } = useRouter();

  const logout = async () => {
    setLoading(true);
    try {
      await signOut();
      push('/login');
    } catch (error) {}
    setLoading(false);
  };

  return firestoreUser && !loading ? (
    <header className="absolute w-full flex h-header justify-between items-center px-5">
      <div className="text-2xl font-bold">brief-quiz</div>
      <div className="flex items-center gap-3">
        <UserAvatar email={firestoreUser.name!} />
        <Button
          className="h-[40px!important]"
          disabled={loading}
          onClick={logout}
        >
          Вийти
        </Button>
      </div>
    </header>
  ) : (
    <></>
  );
}

export default memo(Header);
