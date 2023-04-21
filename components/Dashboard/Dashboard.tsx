'use client';

import { memo, useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from 'contexts/auth';
import { TailSpin } from 'react-loader-spinner';

import { Answer } from 'firebase/entities/quiz';
import { userAPI } from 'firebase/services/firestore';
import RedirectToQuiz from 'components/RedirectToQuiz/RedirectToQuiz';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const { firestoreUser } = useAuth();

  useEffect(() => {
    localStorage.removeItem('redirect_from_auth');

    const init = async () => {
      if (firestoreUser) {
        const answers = await userAPI.getUserAnswers(firestoreUser.id);
        setUserAnswers(answers);
      }
    };
    init();

    setLoading(false);
  }, [firestoreUser]);

  if (loading) {
    return <TailSpin height="80" width="80" color="#222" />;
  }

  return (
    <div className="flex w-full h-full flex-col gap-4 items-center">
      {!userAnswers.length ? (
        <div className="h-full w-full justify-center flex items-center">
          <RedirectToQuiz />
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
