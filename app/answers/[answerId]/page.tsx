'use client';

import Answers from 'components/Answers/Answers';
import { PageWrapper } from 'components/PageWrapper/PageWrapper';
import { useAuth } from 'contexts/auth';
import { Answer } from 'firebase/entities/quiz';
import { userAPI } from 'firebase/services/firestore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';

const getAnswersId = (pathname: string) => {
  const path_arr = pathname.split('/');
  return path_arr[path_arr.length - 1];
};

export default function AnswerPage() {
  const pathname = usePathname();
  const answerId = useMemo(() => getAnswersId(pathname), [pathname]);
  const { firestoreUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userAnswers, setUserAnswers] = useState<Answer | null>(null);

  useEffect(() => {
    if (firestoreUser) {
      setLoading(true);
      userAPI.getUserAnswersById(answerId).then((data) => {
        if (data.result) {
          setUserAnswers(data.result);
        }
      });
    }
    setLoading(false);
  }, [firestoreUser, answerId]);

  if (loading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <TailSpin height="80" width="80" color="#222" />
      </div>
    );
  }

  return (
    <PageWrapper>
      <main className="h-screen w-full py-[100px] px-5">
        {!userAnswers ? (
          <div className="h-full flex flex-col items-center justify-center">
            Ваших відповідй не знайдено
            <Link className="text-2xl font-bold underline" href={'/'}>
              на головну
            </Link>
          </div>
        ) : (
          <div className="flex justify-center h-full">
            <div className="w-full max-w-[1200px] md:w-[80%]">
              <h1 className="text-5xl md:text-7xl font-bold">
                {userAnswers.name}
              </h1>
              <Answers answers={userAnswers} />
            </div>
          </div>
        )}
      </main>
    </PageWrapper>
  );
}
