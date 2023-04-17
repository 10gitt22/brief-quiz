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
      answer: '',
    },
    {
      id: 2,
      blockTitle: 'Про вашу компанію',
      blockId: 1,
      question: 'Галузь діяльності',
      answer: '',
    },
    {
      id: 3,
      blockTitle: 'Про вашу компанію',
      blockId: 1,
      question: 'Короткий опис компанії',
      answer: '',
    },
    {
      id: 4,
      blockTitle: 'Про вашу компанію',
      blockId: 1,
      question: 'Цілі та завдання розробки сайту',
      answer: '',
    },

    // 2

    {
      id: 5,
      blockTitle: 'Вимоги до сайту',
      blockId: 2,
      question: 'Дизайн та кольорова палітра',
      answer: '',
    },
    {
      id: 6,
      blockTitle: 'Вимоги до сайту',
      blockId: 2,
      question: 'Функціональність сайту',
      answer: '',
    },
    {
      id: 7,
      blockTitle: 'Вимоги до сайту',
      blockId: 2,
      question: ' Вимоги до контенту та його структури',
      answer: '',
    },
    {
      id: 8,
      blockTitle: 'Вимоги до сайту',
      blockId: 2,
      question:
        'Особливі функції (наприклад, онлайн-магазин, блог, форум тощо)',
      answer: '',
    },

    // 3
    {
      id: 9,
      blockTitle: 'Цільова аудиторія',
      blockId: 3,
      question: 'Хто є вашою цільовою аудиторією?',
      answer: '',
    },
    {
      id: 10,
      blockTitle: 'Цільова аудиторія',
      blockId: 3,
      question: 'Які її потреби та очікування?',
      answer: '',
    },

    // 4

    {
      id: 11,
      blockTitle: 'Конкуренти',
      blockId: 4,
      question: 'Хто є вашими основними конкурентами в онлайн-просторі?',
      answer: '',
    },
    {
      id: 12,
      blockTitle: 'Конкуренти',
      blockId: 4,
      question: 'Як ви хочете відрізнитися від конкурентів?',
      answer: '',
    },

    // 5

    {
      id: 13,
      blockTitle: 'Функціональні вимоги',
      blockId: 5,
      question: 'Які функції має мати сайт?',
      answer: '',
    },
    {
      id: 14,
      blockTitle: 'Функціональні вимоги',
      blockId: 5,
      question: 'Які можуть бути додаткові функції?',
      answer: '',
    },

    // 6

    {
      id: 15,
      blockTitle: 'Технічні вимоги',
      blockId: 6,
      question: 'Які технічні вимоги має мати сайт?',
      answer: '',
    },
    {
      id: 16,
      blockTitle: 'Технічні вимоги',
      blockId: 6,
      question: 'Яка платформа для розробки має бути використана?',
      answer: '',
    },

    // 7

    {
      id: 17,
      blockTitle: 'Вимоги до контенту',
      blockId: 7,
      question: 'Який контент вам потрібен для сайту?',
      answer: '',
    },
    {
      id: 18,
      blockTitle: 'Вимоги до контенту',
      blockId: 7,
      question:
        'Чи є y вас контент (наприклад, фотографії, відео, текст), який ви хочете включити на сайт?',
      answer: '',
    },

    // 8

    {
      id: 19,
      blockTitle: 'Терміни',
      blockId: 8,
      question: 'Які терміни розробки ви хочете встановити?',
      answer: '',
    },
    {
      id: 20,
      blockTitle: 'Терміни',
      blockId: 8,
      question: 'Чи є у вас термінові дедлайни?',
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
