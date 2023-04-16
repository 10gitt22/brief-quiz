'use client';
import { ButtonHTMLAttributes, DetailedHTMLProps, FC, memo } from 'react';
import classNames from 'classnames';
import styles from './Button.module.css';

type ButtonProps = {
  className?: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button className={classNames(styles.Button, className)} {...props}>
      {children}
    </button>
  );
};

Button.displayName = 'Button';
export default memo(Button);
