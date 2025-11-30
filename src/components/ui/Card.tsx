import React from 'react';

export interface CardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
  clickable?: boolean;
  onClick?: () => void;
  className?: string;
  role?: string;
  ariaLabel?: string;
}

/**
 * Componente Card accesible WCAG 2.2 AAA
 *
 * Características:
 * - Estructura semántica
 * - Contraste adecuado
 * - Clickable con soporte para teclado
 * - Jerarquía visual clara
 */
export const Card: React.FC<CardProps> = ({
  title,
  description,
  children,
  footer,
  variant = 'default',
  clickable = false,
  onClick,
  className = '',
  role,
  ariaLabel,
}) => {
  const baseStyles = 'rounded-lg transition-all focus-within:ring-3 focus-within:ring-blue-600 focus-within:ring-offset-2';

  const variantStyles = {
    default: 'bg-white border-2 border-neutral-light',
    outlined: 'bg-white border-2 border-neutral-dark',
    elevated: 'bg-white shadow-lg border-2 border-transparent',
  };

  const clickableStyles = clickable
    ? 'cursor-pointer hover:shadow-lg hover:border-primary active:shadow-md'
    : '';

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${clickableStyles} ${className}`;

  const handleClick = () => {
    if (clickable && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (clickable && onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  const Component = clickable ? 'div' : 'article';

  return (
    <Component
      className={combinedClassName}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={clickable ? 0 : undefined}
      role={role || (clickable ? 'button' : 'article')}
      aria-label={ariaLabel}
    >
      {(title || description) && (
        <div className="p-6 pb-4">
          {title && (
            <h3 className="text-xl font-bold text-neutral-dark mb-2">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-base text-neutral-gray">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="p-6 pt-0">
        {children}
      </div>

      {footer && (
        <div className="p-6 pt-0 border-t-2 border-neutral-light mt-4">
          {footer}
        </div>
      )}
    </Component>
  );
};
