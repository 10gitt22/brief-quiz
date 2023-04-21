import { Quiz } from 'firebase/entities/quiz';
import { FC } from 'react';

type QuizManagerProps = {
  quiz: Quiz;
};

const QuizManager: FC<QuizManagerProps> = ({ quiz }) => {
  return <div>{quiz.id}</div>;
};

export default QuizManager;
