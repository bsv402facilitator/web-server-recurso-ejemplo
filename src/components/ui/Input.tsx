import React, { useId } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helpText?: string;
  showLabel?: boolean;
  required?: boolean;
  icon?: React.ReactNode;
}

/**
 * Componente Input accesible WCAG 2.2 AAA
 *
 * Características:
 * - Label siempre asociado
 * - Mensajes de error claros
 * - Contraste 7:1
 * - Tamaño táctil mínimo
 * - ARIA labels y descripciones
 */
export const Input: React.FC<InputProps> = ({
  label,
  error,
  helpText,
  showLabel = true,
  required = false,
  icon,
  className = '',
  id: providedId,
  ...props
}) => {
  const generatedId = useId();
  const id = providedId || generatedId;
  const errorId = `${id}-error`;
  const helpId = `${id}-help`;

  const baseStyles = 'w-full min-h-touch px-4 py-3 text-base border-2 rounded transition-colors focus:outline-none focus:ring-3 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

  const stateStyles = error
    ? 'border-feedback-error focus:border-feedback-error'
    : 'border-neutral-gray focus:border-primary';

  const iconContainerStyles = icon ? 'relative' : '';

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className={showLabel ? 'block font-semibold text-neutral-dark mb-2' : 'sr-only'}
      >
        {label}
        {required && (
          <span className="text-feedback-error ml-1" aria-label="obligatorio">
            *
          </span>
        )}
      </label>

      <div className={iconContainerStyles}>
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-gray pointer-events-none" aria-hidden="true">
            {icon}
          </div>
        )}

        <input
          id={id}
          required={required}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={`${error ? errorId : ''} ${helpText ? helpId : ''}`.trim() || undefined}
          className={`${baseStyles} ${stateStyles} ${icon ? 'pl-11' : ''} ${className}`}
          {...props}
        />
      </div>

      {helpText && !error && (
        <p id={helpId} className="mt-2 text-sm text-neutral-gray">
          {helpText}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          className="mt-2 text-sm font-semibold text-feedback-error"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
};
