'use client';

import { Answer } from 'firebase/entities/quiz';
import { FC, Fragment, memo } from 'react';
import { motion } from 'framer-motion';

type StaticAnswersProps = {
  answers: Answer;
};

const StaticAnswers: FC<StaticAnswersProps> = ({ answers }) => {
  const hash = new Map<number, string>();
  return (
    <motion.div
      initial={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.3 }}
      className="py-[50px] mt-[-90px]"
    >
      {answers.questions.map((question, index) => {
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
              <div className="text-xl mb-1">{question.question}</div>
              <div className="border-b border-[#f5f5f5] h-[50px] flex items-center">
                {question.answer}
              </div>
            </div>
          </Fragment>
        );
      })}
    </motion.div>
  );
};

export default memo(StaticAnswers);
