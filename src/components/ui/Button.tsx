import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'accessibility';
  size?: 'sm' | 'base' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

/**
 * Componente Button accesible WCAG 2.2 AAA
 *
 * Características:
 * - Tamaño táctil mínimo 44x44px
 * - Contraste 7:1
 * - Soporte para teclado
 * - Estados visuales claros
 * - ARIA labels apropiados
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'base',
  fullWidth = false,
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  className = '',
  children,
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded transition-all focus-visible:ring-3 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-primary-dark active:bg-primary-dark border-2 border-primary font-bold shadow-md hover:shadow-lg',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark active:bg-secondary-dark border-2 border-secondary font-bold shadow-md hover:shadow-lg',
    outline: 'bg-white text-neutral-dark border-2 border-neutral-dark hover:bg-neutral-light active:bg-neutral-light font-semibold',
    danger: 'bg-feedback-error text-white hover:bg-red-800 active:bg-red-900 border-2 border-feedback-error font-bold shadow-md hover:shadow-lg',
    accessibility: 'bg-secondary text-white hover:bg-secondary-dark active:bg-secondary-dark border-2 border-secondary shadow-md hover:shadow-lg transition-all duration-200 font-bold',
  };

  const sizeStyles = {
    sm: 'min-h-touch-sm min-w-touch-sm px-4 py-2 text-sm gap-2',
    base: 'min-h-touch min-w-touch px-6 py-3 text-base gap-2',
    lg: 'min-h-touch-lg min-w-touch-lg px-8 py-4 text-lg gap-3',
  };

  const widthStyles = fullWidth ? 'w-full' : '';

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={combinedClassName}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="sr-only">Cargando...</span>
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span aria-hidden="true">{icon}</span>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <span aria-hidden="true">{icon}</span>
          )}
        </>
      )}
    </button>
  );
};
