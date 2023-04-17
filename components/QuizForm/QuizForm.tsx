'use client';
import { Quiz as QuizT } from 'firebase/entities/quiz';
import { quizAPI } from 'firebase/services/firestore';
import { useFormik } from 'formik';

import { FC, Fragment, memo, useEffect, useState } from 'react';
import Button from 'ui/Button/Button';
import Input from 'ui/Input/Input';

const quiz = {
  name: 'QUIZ',
  questions: [
    {
      id: 1,
      blockTitle: 'Про вашу компанію',
      blockId: 1,
      question: 'Назва компанії',
      name: 'question1_1',
      answer: '',
    },
    {
      id: 2,
      blockTitle: 'Про вашу компанію',
      blockId: 1,
      question: 'Галузь діяльності',
      name: 'question1_2',
      answer: '',
    },
    {
      id: 3,
      blockTitle: 'Вимоги до сайту',
      blockId: 2,
      question: 'Дизайн та кольорова палітра',
      name: 'question2_1',
      answer: '',
    },
    {
      id: 4,
      blockTitle: 'Цільова аудиторія',
      blockId: 3,
      question: 'Яка аудиторія',
      name: 'questioт3_1',
      answer: '',
    },
  ],
};

type Quiz = typeof quiz;

const QuizForm: FC<{ quiz: Quiz }> = ({ quiz }) => {
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: quiz,
    onSubmit: (values) => {
      console.log(values, 'asldkjasdlk');
    },
  });
  const hash = new Map<number, string>();

  return (
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
  );
};

const QuizComponent = () => {
  useEffect(() => {
    console.log(quiz, 'QUIZ');
  }, []);
  return quiz ? (
    <div className="w-2/3">
      <h2 className="text-7xl font-bold">{quiz.name}</h2>
      <QuizForm quiz={quiz} />
    </div>
  ) : (
    <div>Not found</div>
  );
};

export default memo(QuizComponent);
