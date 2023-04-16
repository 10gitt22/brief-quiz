'use client';

import {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  memo,
  useCallback,
  useMemo,
} from 'react';
import classNames from 'classnames';
import styles from './Input.module.css';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'type'
>;

interface InputProps extends HTMLInputProps {
  id: string;
  label: string;
  name?: string;
  className?: string;
  value?: string | number;
  type?: 'text' | 'email' | 'number' | 'password' | 'number';
  error?: string;
  onChange?: (value: string) => void;
  onChangeFormik?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({
  id,
  label,
  name,
  className,
  value,
  error,
  onChange,
  onChangeFormik,
  type = 'text',
  ...props
}) => {
  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    },
    [onChange]
  );

  const onChangeFunction = useMemo(() => {
    return onChange ? onChangeHandler : onChangeFormik;
  }, [onChangeHandler, onChangeFormik]);

  return (
    <div className={classNames(styles.Input, className)}>
      <input
        id={id}
        type={type}
        value={value}
        name={name}
        className={styles.inputField}
        onChange={onChangeFunction}
        placeholder=" "
        autoComplete="off"
        {...props}
      />
      <label className={styles.inputLabel}>{label}</label>
    </div>
  );
};

Input.displayName = 'Input';
export default memo(Input);
