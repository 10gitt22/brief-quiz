'use client';

import { memo, useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from 'contexts/auth';
import { TailSpin } from 'react-loader-spinner';

import { Quiz } from 'firebase/entities/quiz';
import { userAPI } from 'firebase/services/firestore';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [userQuizes, setUserQuizes] = useState<Quiz[]>([]);
  const { firestoreUser } = useAuth();

  useEffect(() => {
    if (firestoreUser) {
      setLoading(true);
      userAPI.getUserQuizes(firestoreUser.id).then((data) => {
        setUserQuizes(data);
        setLoading(false);
      });
    }
  }, [firestoreUser]);

  if (loading) {
    return <TailSpin height="80" width="80" color="#222" />;
  }

  return userQuizes.length <= 0 ? (
    <Link className="text-2xl font-bold underline" href={'/quiz'}>
      розпочати опитування
    </Link>
  ) : (
    <div>
      {userQuizes.map((quiz) => {
        return quiz.name;
      })}
    </div>
  );
};

export default memo(Dashboard);
