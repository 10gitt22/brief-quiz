import { Quiz } from 'firebase/entities/quiz';
import { quizAPI } from 'firebase/services/firestore';
import { useFormik } from 'formik';
import { ChangeEvent, FC, Fragment, useMemo } from 'react';

import { motion } from 'framer-motion';

import { toast } from 'react-hot-toast';

type QuizManagerProps = {
  quiz: Quiz;
};

const QuizManager: FC<QuizManagerProps> = ({ quiz }) => {
  const { values, handleChange, handleSubmit, setValues } = useFormik({
    initialValues: quiz,
    onSubmit: async (values) => {
      await toast.promise<
        | {
            result: string;
            error: null;
          }
        | {
            result: null;
            error: string;
          }
      >(
        quizAPI.editQuiz(quiz.id, {
          name: values.name,
          questions: values.questions,
        }),
        {
          loading: 'Редагуємо...',
          success: (
            <b>{`Опитування з id: ${quiz.id} відредаговано успішно!`}</b>
          ),
          error: <b>Помилка❌</b>,
        }
      );
    },
  });

  const link = useMemo(() => {
    return `${window.location.origin}/quizes/${quiz.id}`;
  }, [quiz]);

  const blockHash = new Map<number, string>();
  const lastElement = useMemo(() => {
    if (!values.questions.length) return null;
    return values.questions[values.questions.length - 1];
  }, [values.questions]);

  const copyToClipBoard = async () => {
    await navigator.clipboard.writeText(link);
    toast.success('посилання скопійовано');
  };

  const addQuestion = () => {
    let item = {
      question: '',
      blockId: lastElement!.blockId,
      answer: '',
      id: lastElement!.id + 1,
      blockTitle: lastElement!.blockTitle,
    };

    setValues({
      id: values.id,
      name: values.name,
      questions: [...values.questions, item],
    });
  };

  const deleteQuestion = (id: number) => {
    const new_arr = values.questions.filter((question) => question.id !== id);
    setValues({
      id: values.id,
      name: values.name,
      questions: new_arr,
    });
  };

  const addBlock = () => {
    let item = null;
    if (!lastElement) {
      item = {
        question: '',
        blockId: 1,
        answer: '',
        id: 1,
        blockTitle: '',
      };
    } else {
      item = {
        question: '',
        blockId: lastElement.blockId + 1,
        answer: '',
        id: lastElement.id + 1,
        blockTitle: '',
      };
    }

    setValues({
      id: values.id,
      name: values.name,
      questions: [...values.questions, item],
    });
  };

  const editBlock = (e: ChangeEvent<HTMLInputElement>, blockId: number) => {
    const new_arr = values.questions.map((question) => {
      if (question.blockId === blockId) {
        return {
          ...question,
          blockTitle: e.currentTarget.value,
        };
      } else {
        return question;
      }
    });
    handleChange(e);
    setValues({
      id: values.id,
      name: values.name,
      questions: new_arr,
    });
  };

  const deleteBlock = (blockId: number) => {
    const new_arr = values.questions.filter(
      (question) => question.blockId !== blockId
    );

    setValues({
      id: values.id,
      name: values.name,
      questions: new_arr,
    });
  };

  return (
    <form className="py-[50px] md:px-[15%]" onSubmit={handleSubmit}>
      <div className="flex flex-col my-5">
        <label className="text-3xl md:text-5xl font-bold mb-3">
          Назва опитування:
        </label>
        <input
          value={values.name}
          id="name"
          name="name"
          required
          disabled={quiz.id === 'TwkmZZTxJedotBVapB6j'}
          onChange={handleChange}
          className="flex border text-l md:text-2xl font-bold border-gray-200 border-l-[5px] rounded-[10px] resize-y outline-none min-h-[50px] px-2 py-1"
        />
        <div className="flex w-full flex-wrap mt-10 gap-3  mb-3">
          <div>Скопіювати посилання на опитування:</div>
          <div
            className="w-full overflow-hidden font-normal underline whitespace-nowrap text-ellipsis hover:cursor-pointer hover:text-red-900 transition-colors"
            onClick={copyToClipBoard}
          >
            {link}
          </div>
        </div>
        <div className="text-3xl md:text-5xl font-bold mt-20">Питання:</div>

        {values.questions.length === 0 && (
          <div className="flex items-center gap-4 mt-3">
            <button
              className="flex items-center justify-center text-xs md:text-sm w-[200px] h-[40px] text-app-white rounded-[10px] bg-app-black"
              type="button"
              onClick={addBlock}
            >
              Додати блок
            </button>
          </div>
        )}
        {values.questions.map((question, index) => {
          const isInHash = blockHash.has(question.blockId);
          if (!isInHash) blockHash.set(question.blockId, question.blockTitle);
          return (
            <Fragment key={index}>
              {!isInHash && (
                <motion.div
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0.3 }}
                  className="flex items-center justify-between gap-5 mt-10"
                >
                  <input
                    id={`${question.id}`}
                    name={`questions[${index}].blockTitle`}
                    placeholder="Назва блоку"
                    value={question.blockTitle}
                    disabled={quiz.id === 'TwkmZZTxJedotBVapB6j'}
                    onChange={(e) => editBlock(e, question.blockId)}
                    className="flex border text-l md:text-2xl font-bold border-gray-300 w-full border-l-[5px] rounded-[10px] resize-y outline-none min-h-[50px] px-2 py-1"
                  />

                  {quiz.id !== 'TwkmZZTxJedotBVapB6j' && (
                    <button
                      type="button"
                      className="h-[50px] text-xs md:text-sm rounded-[5px] bg-red-300 px-3 hover:bg-red-400 transition-colors"
                      onClick={() => deleteBlock(question.blockId)}
                    >
                      Видалити блок ❌
                    </button>
                  )}
                </motion.div>
              )}
              <motion.div
                className="flex w-full mt-3 gap-2 pl-2 md:pl-10"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.3 }}
              >
                <input
                  id={`${question.id}`}
                  name={`questions[${index}].question`}
                  placeholder="Текст питання"
                  value={question.question}
                  onChange={handleChange}
                  disabled={quiz.id === 'TwkmZZTxJedotBVapB6j'}
                  className="flex border text-sm md:text-l border-gray-300 w-full border-l-[5px] rounded-[10px] resize-y outline-none min-h-[50px] px-2 py-1"
                />
                {quiz.id !== 'TwkmZZTxJedotBVapB6j' && (
                  <button
                    type="button"
                    className=" bg-red-100 hover:bg-red-200 transition-color text-xs md:text-sm  rounded-[5px] px-3"
                    onClick={() => deleteQuestion(question.id)}
                  >
                    Видалити питання ❌
                  </button>
                )}
              </motion.div>
              {values.questions.length - 1 === index &&
                quiz.id !== 'TwkmZZTxJedotBVapB6j' && (
                  <div className="flex gap-4 mt-10">
                    <button
                      className="flex items-center justify-center text-xs md:text-sm w-[200px] h-[40px] text-app-white rounded-[10px] bg-app-black"
                      type="button"
                      onClick={addBlock}
                    >
                      Додати блок
                    </button>
                    <button
                      className="flex items-center  text-xs md:text-sm justify-center w-[200px] h-[40px] text-app-white rounded-[10px] bg-app-black"
                      type="button"
                      onClick={addQuestion}
                    >
                      Додати питання
                    </button>
                    <button
                      className="flex items-center text-xs md:text-sm justify-center w-[200px] h-[40px] text-app-white rounded-[10px] bg-green-700"
                      type="submit"
                    >
                      Зберегти
                    </button>
                  </div>
                )}
            </Fragment>
          );
        })}
      </div>
    </form>
  );
};

export default QuizManager;
