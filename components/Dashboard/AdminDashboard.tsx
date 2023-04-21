'use client';

import { useAuth } from 'contexts/auth';
import { Answer } from 'firebase/entities/quiz';
import { answersAPI } from 'firebase/services/firestore';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { TailSpin } from 'react-loader-spinner';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const { firestoreUser } = useAuth();

  const init = async () => {
    if (firestoreUser) {
      const answersResponse = await answersAPI.getAnswers();
      setAnswers(() => {
        setLoading(false);
        return answersResponse;
      });
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, [firestoreUser]);

  const deleteAnswer = async (answer: Answer) => {
    await toast.promise<void>(answersAPI.deleteAnswer(answer.id), {
      loading: 'Видалення...',
      success: (
        <b>{`Відповідь користувача ${answer.userName} видалена успішно!`}</b>
      ),
      error: <b>Помилка❌</b>,
    });
    await init();
  };

  if (loading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <TailSpin height="80" width="80" color="#222" />
      </div>
    );
  }

  return (
    <div className="flex w-full h-full flex-col gap-4 items-center">
      {!answers.length ? (
        <div className="text-xl">Ще нема жодної відповіді 🤷‍♂️</div>
      ) : (
        <>
          <h2 className="self-start text-2xl font-bold">Відповіді:</h2>
          {answers.map((answer) => {
            const date = answer.answeredAt.toDate().toLocaleDateString('uk-UA');
            return (
              <div className="flex w-full" key={answer.name}>
                <Link className="h-fit w-full" href={`/answers/${answer.id}`}>
                  <div className="w-full bg-zinc-100 hover:bg-zinc-200 rounded-l-[10px] flex flex-col md:flex-row md:items-center justify-between px-5 py-5 transition-colors">
                    <div className="font-bold text-l">
                      Від: <span className="ml-3">🙋🏻‍♂️ {answer.userName}</span>
                    </div>
                    <div className="">{answer.name}</div>
                    <div className="">{date}</div>
                  </div>
                </Link>
                <button
                  className="bg-red-100 transition-colors hover:bg-red-200 px-4 py-1 rounded-r-[10px]"
                  data-id={answer.id}
                  onClick={() => deleteAnswer(answer)}
                >
                  Видалити ❌
                </button>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
