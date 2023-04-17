'use client';

import { useAuth } from 'contexts/auth';
import { userAPI } from 'firebase/services/firestore';
import Link from 'next/link';
import { memo, useEffect, useState } from 'react';

const Dashboard = () => {
  const [userQuizes, setUserQuizes] = useState<any[]>([]);
  const { firestoreUser } = useAuth();

  useEffect(() => {
    if (firestoreUser) {
      userAPI.getUserQuizes(firestoreUser.id).then((data) => {
        setUserQuizes(data);
      });
    }
  }, [firestoreUser]);

  return userQuizes.length <= 0 ? (
    <Link className="text-2xl font-bold underline" href={'/quiz'}>
      розпочати опитування
    </Link>
  ) : (
    <div></div>
  );
};

export default memo(Dashboard);
