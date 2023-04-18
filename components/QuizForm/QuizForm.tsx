'use client';

import { FC, Fragment, memo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { ThreeDots } from 'react-loader-spinner';

import { Answer, Quiz } from 'firebase/entities/quiz';
import { userAPI } from 'firebase/services/firestore';
import { useAuth } from 'contexts/auth';
import { Timestamp } from 'firebase/firestore';

type QuizFormProps = {
  quiz: Quiz | Answer;
  isEdit: boolean;
  editId?: string;
};

const QuizForm: FC<QuizFormProps> = ({ quiz, isEdit, editId }) => {
  const { firestoreUser } = useAuth();
  const { push } = useRouter();
  const [saving, setSaving] = useState(false);

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: quiz,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setSaving(true);

      let data = null;

      if (isEdit) {
        data = await userAPI.editAnswersById(editId!, {
          ...values,
          answeredAt: Timestamp.now(),
        });
      } else {
        data = await userAPI.saveAnswers({
          ...values,
          userName: firestoreUser!.name,
          userId: firestoreUser!.id,
          answeredAt: Timestamp.now(),
        });
      }

      if (data.result) {
        toast.success('Ваші відповіді збережено!');
        push('/');
      }
      if (data.error) {
        toast.error(data.error);
      }
      setSaving(false);
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
          className="flex items-center justify-center w-[200px] h-[50px] text-app-white rounded-[10px] bg-app-black"
          type="submit"
          disabled={saving}
        >
          {saving ? (
            <ThreeDots width={20} height={20} color="#fff" />
          ) : (
            'Зберегти'
          )}
        </button>
      </div>
    </form>
  );
};

export default memo(QuizForm);
