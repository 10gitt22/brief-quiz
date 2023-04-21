'use client';

import { PageWrapper } from 'components/PageWrapper/PageWrapper';
import QuizManager from 'components/QuizManager/QuizManager';
import { Quiz } from 'firebase/entities/quiz';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { TailSpin } from 'react-loader-spinner';
import { quizAPI } from 'firebase/services/firestore';

const getQuizId = (pathname: string) => {
  const path_arr = pathname.split('/');
  return path_arr[path_arr.length - 1];
};

export default function EditQuizPage() {
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  const pathname = usePathname();
  const quizId = useMemo(() => getQuizId(pathname), [pathname]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const quizResp = await quizAPI.getQuizById(quizId);
      if (quizResp) {
        setQuiz(() => {
          setLoading(false);
          return quizResp;
        });
      } else {
        setLoading(false);
      }
    };
    init();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <TailSpin height="80" width="80" color="#222" />
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="w-full h-full flex justify-center items-center text-2xl">
        Опитування не знайдено 😡
      </div>
    );
  }

  return (
    <PageWrapper>
      <main className="flex justify-center items-center text-app-black h-full pt-[100px] px-5">
        <div className="w-full h-full relative">
          <QuizManager quiz={quiz} />
        </div>
      </main>
    </PageWrapper>
  );
}
