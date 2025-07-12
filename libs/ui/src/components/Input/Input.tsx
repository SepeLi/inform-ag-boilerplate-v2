import React, { forwardRef, useId } from 'react';
import styles from './Input.module.css';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'outline' | 'filled' | 'flushed' | 'unstyled';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  helperText?: string;
  fullWidth?: boolean;
  rounded?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'outline',
      size = 'md',
      leftIcon,
      rightIcon,
      error = false,
      errorMessage,
      label,
      helperText,
      fullWidth = false,
      rounded = false,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const autoId = useId();
    const inputId = id || autoId;

    const baseClass = styles.input;
    const variantClass = styles[variant];
    const sizeClass = styles[size];
    const widthClass = fullWidth ? styles.fullWidth : '';
    const roundedClass = rounded ? styles.rounded : '';
    const errorClass = error ? styles.error : '';
    const hasLeftIcon = leftIcon ? styles.hasLeftIcon : '';
    const hasRightIcon = rightIcon ? styles.hasRightIcon : '';

    const combinedClassName = [
      baseClass,
      variantClass,
      sizeClass,
      widthClass,
      roundedClass,
      errorClass,
      hasLeftIcon,
      hasRightIcon,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={styles.container}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        <div className={styles.inputWrapper}>
          {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
          <input
            ref={ref}
            id={inputId}
            className={combinedClassName}
            {...props}
          />
          {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
        </div>
        {error && errorMessage && (
          <p className={styles.errorMessage}>{errorMessage}</p>
        )}
        {!error && helperText && (
          <p className={styles.helperText}>{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
