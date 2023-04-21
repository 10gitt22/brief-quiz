'use client';

import { memo, useEffect, useMemo, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';

import { quizAPI, userAPI } from 'firebase/services/firestore';
import { Quiz } from 'firebase/entities/quiz';

import QuizForm from 'components/QuizForm/QuizForm';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from 'contexts/auth';
import { toast } from 'react-hot-toast';

const getQuizId = (pathname: string) => {
  const path_arr = pathname.split('/');
  return path_arr[path_arr.length - 1];
};
// http://localhost:3000/quiz/TwkmZZTxJedotBVapB6j
const QuizComponent = () => {
  const { firestoreUser } = useAuth();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();

  const pathname = usePathname();
  const quizId = useMemo(() => getQuizId(pathname), [pathname]);

  useEffect(() => {
    const isRedirectAfterAuth = localStorage.getItem('redirect_from_auth');
    if (!isRedirectAfterAuth) {
      localStorage.setItem('quiz_url', location.href);
    } else {
      console.log('cleaned');
      localStorage.removeItem('redirect_from_auth');
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      if (firestoreUser) {
        const isAnswered = await userAPI.checkIfAlreadyAnswered(
          firestoreUser.id,
          quizId
        );
        if (isAnswered) {
          toast('Ви вже пройшли опитування', {
            style: {
              backgroundColor: '#222',
              color: '#fff',
            },
          });
          push('/');
        }

        const quizData = await quizAPI.getQuizById(quizId);
        quizData &&
          setQuiz(() => {
            setLoading(false);
            return quizData;
          });

        setLoading(false);
      }
    };
    init();
  }, [firestoreUser, quizId]);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <TailSpin height="80" width="80" color="#222" />
      </div>
    );
  }

  return quiz ? (
    <div className="w-full max-w-[1200px] md:w-[80%]">
      <h1 className="text-5xl md:text-7xl font-bold">{quiz.name}</h1>
      <QuizForm quiz={quiz} isEdit={false} />
    </div>
  ) : (
    <div className="h-full flex items-center text-2xl">
      {'Опитування не знайдено:( 🤷‍♂️'}
    </div>
  );
};

export default memo(QuizComponent);
