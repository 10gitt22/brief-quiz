'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';

import { signUp } from 'firebase/services/auth';
import Button from 'ui/Button/Button';
import Input from 'ui/Input/Input';

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
    },
    onSubmit: async (data) => {
      setLoading(true);
      const signupData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const response = await signUp(signupData);
      if (response.result) {
        push('/');
      }
      if (response.error) {
        toast.error(response.error);
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
        className="w-full py-5 max-w-[500px] flex flex-col gap-7"
        onSubmit={handleSubmit}
      >
        <Input
          id="name"
          name="name"
          value={values.name}
          onChangeFormik={handleChange}
          label="Як вас звати?"
          required
        />
        <Input
          id="email"
          name="email"
          value={values.email}
          onChangeFormik={handleChange}
          label="Введіть пошту"
          required
        />
        <Input
          id="password"
          name="password"
          value={values.password}
          onChangeFormik={handleChange}
          type="password"
          label="Пароль"
          required
        />
        <Input
          id="confirm_password"
          name="confirm_password"
          value={values.confirm_password}
          onChangeFormik={handleChange}
          type="password"
          label="Підтвердіть пароль"
          required
        />
        <Button disabled={loading} className="font-bold">
          Зареєструватись
        </Button>
        <span>
          {'Уже маєте аккаунт?'}{' '}
          <Link href={'/login'} className="text-app-primary underline ">
            Увійдіть
          </Link>
        </span>
      </motion.form>
    </AnimatePresence>
  );
}
