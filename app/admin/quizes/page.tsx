'use client';

import { PageWrapper } from 'components/PageWrapper/PageWrapper';
import { Quiz } from 'firebase/entities/quiz';
import { quizAPI } from 'firebase/services/firestore';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import QuizesLoading from './loading';
import { useRouter } from 'next/navigation';
import { ThreeDots } from 'react-loader-spinner';
import { toast } from 'react-hot-toast';

export default function AdminQuizesPage() {
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [quizes, setQuizes] = useState<Quiz[]>([]);
  const { push } = useRouter();

  const init = async () => {
    const quizesResponse = await quizAPI.getQuizes();

    setQuizes(() => {
      setLoading(false);
      return quizesResponse;
    });
  };

  useEffect(() => {
    init();
  }, []);

  const createQuiz = async () => {
    setCreating(true);
    const id = await quizAPI.createQuiz();
    setCreating(false);
    push(`/admin/quizes/${id}`);
  };

  const deleteQuiz = async (quiz: Quiz) => {
    await toast.promise<void>(quizAPI.deleteQuiz(quiz.id), {
      loading: 'Видалення...',
      success: <b>{`Опитування з id: ${quiz.id} видалено успішно!`}</b>,
      error: <b>Помилка❌</b>,
    });
    console.log('qq');

    await init();
  };

  if (loading) {
    return <QuizesLoading />;
  }

  return (
    <PageWrapper>
      <main className="flex justify-center items-center text-app-black h-full pt-[100px] px-5">
        <div className="w-full h-full relative">
          <div className="top-0 font-bold flex w-full gap-3 items-center justify-end mb-10 border-b py-2">
            <Link className="hover:underline" href={'/'}>
              Відповіді
            </Link>
            <Link className="underline" href={'/admin/quizes'}>
              Опитування
            </Link>
            <button
              className="flex items-center w-[180px] font-normal justify-center h-[40px] text-app-white rounded-[10px] px-2 bg-app-black"
              onClick={createQuiz}
              disabled={creating}
            >
              {creating ? (
                <ThreeDots width={20} height={20} color="#fff" />
              ) : (
                'додати опитування +'
              )}
            </button>
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
                    <div key={quiz.name} className="flex w-full">
                      <Link
                        className="h-fit w-full"
                        href={`/admin/quizes/${quiz.id}`}
                      >
                        <div className="w-full bg-zinc-100 hover:bg-zinc-200 rounded-l-[10px] flex flex-col md:flex-row md:items-center justify-between px-5 py-5 transition-colors">
                          <div className="font-bold">ID: {quiz.id}</div>
                          <div className="">{quiz.name}</div>
                        </div>
                      </Link>
                      <button
                        className="bg-red-100 disabled:bg-red-50 transition-colors hover:bg-red-200 px-4 py-1 rounded-r-[10px]"
                        data-id={quiz.id}
                        disabled={quiz.id === 'TwkmZZTxJedotBVapB6j'}
                        onClick={() => deleteQuiz(quiz)}
                      >
                        Видалити ❌
                      </button>
                    </div>
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
