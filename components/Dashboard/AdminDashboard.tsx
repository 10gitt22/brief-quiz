'use client';

import { useAuth } from 'contexts/auth';
import { Answer } from 'firebase/entities/quiz';
import { Firestore, Timestamp } from 'firebase/firestore';
import { answersAPI } from 'firebase/services/firestore';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const { firestoreUser } = useAuth();

  useEffect(() => {
    const init = async () => {
      if (firestoreUser) {
        const answersResponse = await answersAPI.getAnswers();
        setAnswers(answersResponse);
      }
    };
    init();
    setLoading(false);
  }, [firestoreUser]);

  if (loading) {
    return <TailSpin height="80" width="80" color="#222" />;
  }

  if (!answers.length) {
    return <div className="text-xl">Ще нема жодної відповіді 🤷‍♂️</div>;
  }

  return (
    <div className="flex w-full h-full flex-col gap-4 items-center py-10">
      <h2 className="self-start text-2xl font-bold">Відповіді:</h2>
      {answers.map((answer) => {
        const date = answer.answeredAt.toDate().toLocaleDateString('uk-UA');
        return (
          <Link
            key={answer.name}
            className="h-fit w-full"
            href={`/answers/${answer.id}`}
          >
            <div className="w-full bg-zinc-100 hover:bg-zinc-200 rounded-[10px] flex flex-col md:flex-row md:items-center justify-between px-5 py-5 transition-colors">
              <div className="font-bold text-l">
                Від: <span className="ml-3">🙋🏻‍♂️ {answer.userName}</span>
              </div>
              <div className="">{answer.name}</div>
              <div className="">{date}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default AdminDashboard;
