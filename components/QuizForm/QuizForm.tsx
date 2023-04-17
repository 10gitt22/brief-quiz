'use client';

import { FC, Fragment, memo, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';

import { Quiz } from 'firebase/entities/quiz';
import { quizAPI, userAPI } from 'firebase/services/firestore';
import { useAuth } from 'contexts/auth';

const QuizForm: FC<{ quiz: Quiz }> = ({ quiz }) => {
  const { user } = useAuth();
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: quiz,
    onSubmit: async (values) => {
      const data = await userAPI.saveAnswers(user!.uid, values);
      if (data.result) {
        toast.success('Ваші відповіді збережено!');
      }
      if (data.error) {
        toast.error(data.error);
      }
    },
  });
  const hash = new Map<number, string>();
  return (
    <>
      <form className="py-[50px] mt-[-90px]" onSubmit={handleSubmit}>
        {values.questions.map((question, index) => {
          const isInHash = hash.has(question.blockId);
          if (!isInHash) hash.set(question.blockId, question.blockTitle);
          return (
            <Fragment key={index}>
              {!isInHash && (
                <h2 className="text-3xl font-bold mt-20 mb-5">
                  {question.blockId}. {question.blockTitle}
                </h2>
              )}
              <div className="flex flex-col my-5">
                <label className="text-xl mb-1" htmlFor={`${question.id}`}>
                  {question.question}
                </label>
                <textarea
                  id={`${question.id}`}
                  name={`questions[${index}].answer`}
                  value={question.answer}
                  onChange={handleChange}
                  className="flex border border-gray-200 border-l-[5px] rounded-[10px] resize-y outline-none min-h-[50px] px-2 py-1"
                />
              </div>
            </Fragment>
          );
        })}

        <div className="mt-10  py-5">
          <button
            className="w-[200px] h-[50px] text-app-white rounded-[10px] bg-app-black"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

const QuizComponent = () => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    quizAPI.getQuiz().then((data) => {
      if (data) setQuiz(data);
    });
  }, []);

  return quiz ? (
    <div className="w-full max-w-[1200px] md:w-[80%]">
      <h1 className="text-5xl md:text-7xl font-bold">{quiz.name}</h1>
      <QuizForm quiz={quiz} />
    </div>
  ) : (
    <div>Not found</div>
  );
};

export default memo(QuizComponent);
