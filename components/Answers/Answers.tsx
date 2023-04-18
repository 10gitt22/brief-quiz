'use client';

import { Answer } from 'firebase/entities/quiz';
import { FC, useCallback, useState } from 'react';
import StaticAnswers from './StaticAnswers';
import QuizForm from 'components/QuizForm/QuizForm';
import { motion } from 'framer-motion';

type AnswersProps = {
  answers: Answer;
};

const Answers: FC<AnswersProps> = ({ answers }) => {
  const [isEdit, setIsEdit] = useState(false);

  const enableEdit = useCallback(() => {
    setIsEdit(true);
  }, []);

  const disableEdit = useCallback(() => {
    setIsEdit(false);
  }, []);

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-end py-5 border-b border-[#f5f5f5] mt-10">
        {isEdit ? (
          <div className="flex gap-2">
            <button
              onClick={disableEdit}
              className="flex items-center justify-center w-[200px] h-[40px] text-app-black border border-app-black rounded-[10px]"
            >
              Відмінити редагування
            </button>
          </div>
        ) : (
          <button
            onClick={enableEdit}
            className="flex items-center justify-center w-[200px] h-[40px] text-app-white rounded-[10px] bg-app-black"
          >
            Редагувати відповіді
          </button>
        )}
      </div>
      {isEdit ? (
        <motion.div
          className="q1"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.3 }}
        >
          <QuizForm quiz={answers} isEdit={true} editId={answers.id} />
        </motion.div>
      ) : (
        <StaticAnswers answers={answers} />
      )}
    </div>
  );
};

export default Answers;
