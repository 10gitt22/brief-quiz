'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-hot-toast';

const isValidUrl = (urlString: string) => {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
};

const RedirectToQuiz = () => {
  const { push } = useRouter();
  const [link, setLink] = useState('');

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.currentTarget.value);
  };

  const handleSubmit = () => {
    if (!isValidUrl(link)) {
      toast.error('Невірне посилання!');
      return;
    }
    const url = new URL(link);

    const validHost = url.hostname === window.location.hostname;
    console.log(url.pathname.split('/'), 'splited');

    const validPath = url.pathname.split('/')[1] === 'quiz';
    const validId = url.pathname.split('/')[2]?.length > 0;

    if (!validHost || !validPath || !validId) {
      toast.error(
        `Помилка!\nПосилання повинно виглядати у форматі https://${window.location.hostname}/quizes/{quizId} `
      );
      return;
    }

    const quizId = url.pathname.split('/')[2];
    push(`/quizes/${quizId}`);
  };

  return (
    <div className="flex flex-col gap-5 w-[90%] md:w-[60%] items-center">
      <p className="font-bold text-xl">вставте посилання на опитування</p>
      <div className="flex w-full gap-5">
        <input
          className="w-full border border-app-black h-[50px] border-l-[5px] rounded-[10px] px-5 outline-none placeholder:text-[#999] font-thin "
          value={link}
          placeholder="https://brief-quiz.vercel.app/quizes/..."
          onChange={handleInput}
        />
        <button
          className="flex items-center justify-center w-[200px] h-[50px] text-app-white rounded-[10px] bg-app-black disabled:bg-zinc-600"
          onClick={handleSubmit}
          disabled={link.length === 0}
        >
          Перейти
        </button>
      </div>
    </div>
  );
};

export default RedirectToQuiz;
