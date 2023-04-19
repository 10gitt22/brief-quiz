'use client';

import { memo, useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';

import { quizAPI, userAPI } from 'firebase/services/firestore';
import { Quiz } from 'firebase/entities/quiz';

import QuizForm from 'components/QuizForm/QuizForm';
import { useRouter } from 'next/navigation';
import { useAuth } from 'contexts/auth';
import { toast } from 'react-hot-toast';

const QuizComponent = () => {
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const { firestoreUser } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    const init = async () => {
      if (firestoreUser) {
        const alreadyAnswered = await userAPI.getUserAnswers(firestoreUser.id);
        if (alreadyAnswered.length > 0) {
          toast('Ви вже пройшли опитування', {
            style: {
              backgroundColor: '#222',
              color: '#fff',
            },
          });
          push('/');
        } else {
          const quizData = await quizAPI.getQuiz();
          if (quizData) setQuiz(quizData);
        }
      }
      setLoading(false);
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

  return quiz ? (
    <div className="w-full max-w-[1200px] md:w-[80%]">
      <h1 className="text-5xl md:text-7xl font-bold">{quiz.name}</h1>
      <QuizForm quiz={quiz} isEdit={false} />
    </div>
  ) : (
    <div>{'Опитування не знайдено:('}</div>
  );
};

export default memo(QuizComponent);
