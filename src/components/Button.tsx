import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from '../styles/components/Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function Button({ children, type, onSubmit, ...rest }: ButtonProps) {
  return (
    <button
      type={type}
      onSubmit={onSubmit}
      className={styles.container}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;