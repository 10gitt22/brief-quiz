'use client';

import { memo, useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from 'contexts/auth';
import { TailSpin } from 'react-loader-spinner';

import { Answer } from 'firebase/entities/quiz';
import { userAPI } from 'firebase/services/firestore';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const { firestoreUser } = useAuth();

  useEffect(() => {
    if (firestoreUser) {
      setLoading(true);
      userAPI.getUserAnswers(firestoreUser.id).then((data) => {
        setUserAnswers(data);

        setLoading(false);
      });
    }
  }, [firestoreUser]);

  if (loading) {
    return <TailSpin height="80" width="80" color="#222" />;
  }

  return (
    <div className="flex w-full h-full flex-col gap-4 items-center">
      {userAnswers.length <= 0 ? (
        <div className="h-full flex items-center">
          <Link className="text-2xl font-bold underline" href={'/quiz'}>
            пройти опитування
          </Link>
        </div>
      ) : (
        <div className="w-full h-full flex gap-5">
          {userAnswers.map((answer) => {
            return (
              <Link
                key={answer.name}
                className="h-fit"
                href={`/answers/${answer.id}`}
              >
                <div className="bg-app-black text-app-white p-5 w-[300px] h-[300px] rounded-[10px] shadow-xl text-3xl flex items-end">
                  {answer.name}
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
