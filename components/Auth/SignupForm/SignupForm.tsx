'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';

import { signUp } from 'firebase/services/auth';
import Button from 'ui/Button/Button';
import Input from 'ui/Input/Input';
import { useAuth } from 'contexts/auth';

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { push, back } = useRouter();

  useEffect(() => {
    if (user) push('/');
  }, [user]);

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
        const url = localStorage.getItem('quiz_url');
        if (url) {
          window.location.href = url;
          localStorage.setItem('redirect_from_auth', 'true');
        } else {
          push('/');
        }
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
          label="Як Вас звати?"
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
          Зареєструватися
        </Button>
        <span>
          {'Уже маєте акаунт?'}{' '}
          <Link href={'/login'} className="text-app-primary underline ">
            Увійдіть
          </Link>
        </span>
      </motion.form>
    </AnimatePresence>
  );
}
