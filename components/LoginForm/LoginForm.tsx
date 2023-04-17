'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';

import Button from 'ui/Button/Button';
import Input from 'ui/Input/Input';
import { logIn } from 'firebase/services/auth';
import { AnimatePresence, motion } from 'framer-motion';

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (data) => {
      setLoading(true);
      try {
        await logIn(data.email, data.password);
        push('/');
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    },
  });

  return (
    <AnimatePresence>
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="w-full py-5 max-w-[600px] flex flex-col gap-7"
        onSubmit={handleSubmit}
      >
        <Input
          id="email"
          name="email"
          value={values.email}
          onChangeFormik={handleChange}
          label="Введіть пошту"
        />
        <Input
          id="password"
          name="password"
          value={values.password}
          onChangeFormik={handleChange}
          type="password"
          label="Пароль"
        />
        <Button disabled={loading} className="font-bold">
          Увійти
        </Button>
        <span>
          {'Досі нема аккаунту?'}{' '}
          <Link href={'/signup'} className="text-app-primary underline ">
            Зареєструйтесь
          </Link>
        </span>
      </motion.form>
    </AnimatePresence>
  );
}
