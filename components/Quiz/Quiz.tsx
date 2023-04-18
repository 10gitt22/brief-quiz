'use client';

import { memo, useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';

import { quizAPI } from 'firebase/services/firestore';
import { Quiz } from 'firebase/entities/quiz';

import QuizForm from 'components/QuizForm/QuizForm';

const QuizComponent = () => {
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    quizAPI.getQuiz().then((data) => {
      if (data) setQuiz(data);
      setLoading(false);
    });
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
      <QuizForm quiz={quiz} />
    </div>
  ) : (
    <div>{'Опитування не знайдено:('}</div>
  );
};

export default memo(QuizComponent);
