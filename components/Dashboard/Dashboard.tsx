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

  return (
    <div className="flex w-full h-full flex-col gap-4 items-center">
      {userQuizes.length <= 0 ? (
        <div className="h-full flex items-center">
          <Link className="text-2xl font-bold underline" href={'/quiz'}>
            пройти опитування
          </Link>
        </div>
      ) : (
        <div className="w-full h-full flex gap-5">
          {userQuizes.map((quiz) => {
            return (
              <Link key={quiz.name} className="h-fit" href={'/quiz'}>
                <div className="bg-app-black text-app-white p-5 w-[300px] h-[300px] rounded-[10px] shadow-xl text-3xl flex items-end">
                  {quiz.name}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default memo(Dashboard);
