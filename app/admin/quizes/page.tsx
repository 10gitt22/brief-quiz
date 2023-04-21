'use client';

import { PageWrapper } from 'components/PageWrapper/PageWrapper';
import { Quiz } from 'firebase/entities/quiz';
import { quizAPI } from 'firebase/services/firestore';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import QuizesLoading from './loading';

export default function AdminQuizesPage() {
  const [loading, setLoading] = useState(true);
  const [quizes, setQuizes] = useState<Quiz[]>([]);

  useEffect(() => {
    const init = async () => {
      const quizesResponse = await quizAPI.getQuizes();
      console.log(quizesResponse, 'asdaksj');

      setQuizes(() => {
        setLoading(false);
        return quizesResponse;
      });
    };
    init();
  }, []);

  if (loading) {
    return <QuizesLoading />;
  }

  return (
    <PageWrapper>
      <main className="flex justify-center items-center text-app-black h-full pt-[100px] px-5">
        <div className="w-full h-full relative">
          <div className="top-0 font-bold flex w-full gap-3 justify-end mb-10 border-b py-2">
            <Link className="hover:underline" href={'/'}>
              Відповіді
            </Link>
            <Link className="underline" href={'/admin/quizes'}>
              Опитування
            </Link>
          </div>
          <div className="flex w-full h-full flex-col gap-4 items-center">
            {!quizes.length ? (
              <div className="text-xl">
                Ви не створили жодного опитування 🤷‍♂️
              </div>
            ) : (
              <>
                <h2 className="self-start text-2xl font-bold">Відповіді:</h2>
                {quizes.map((quiz) => {
                  return (
                    <Link
                      key={quiz.name}
                      className="h-fit w-full"
                      href={`/admin/quizes/${quiz.id}`}
                    >
                      <div className="w-full bg-zinc-100 hover:bg-zinc-200 rounded-[10px] flex flex-col md:flex-row md:items-center justify-between px-5 py-5 transition-colors">
                        <div className="">{quiz.name}</div>
                      </div>
                    </Link>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </main>
    </PageWrapper>
  );
}
