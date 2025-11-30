import React, { useEffect, useRef } from 'react';
import { Button } from './Button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
}

/**
 * Componente Modal accesible WCAG 2.2 AAA
 *
 * Características:
 * - Trap de foco
 * - Cierre con ESC
 * - ARIA dialog
 * - Overlay con contraste
 * - Anuncios para lectores de pantalla
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  showCloseButton = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const sizeStyles = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  useEffect(() => {
    if (isOpen) {
      // Guardar elemento activo antes de abrir el modal
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Enfocar el modal
      modalRef.current?.focus();

      // Prevenir scroll del body
      document.body.style.overflow = 'hidden';

      // Manejar tecla ESC
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEsc);

      return () => {
        document.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = 'unset';

        // Restaurar foco al elemento anterior
        previousActiveElement.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  // Trap de foco dentro del modal
  useEffect(() => {
    if (!isOpen) return;

    const modal = modalRef.current;
    if (!modal) return;

    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    modal.addEventListener('keydown', handleTab);

    return () => {
      modal.removeEventListener('keydown', handleTab);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className={`bg-white rounded-lg shadow-2xl w-full ${sizeStyles[size]} max-h-[90vh] overflow-y-auto focus:outline-none focus:ring-3 focus:ring-blue-600`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-neutral-light bg-gradient-to-r from-primary to-secondary">
          <h2
            id="modal-title"
            className="text-2xl font-bold text-white flex-1 text-center"
          >
            {title}
          </h2>
          {showCloseButton && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              aria-label="Cerrar modal"
              className="!min-w-0 !px-3 !bg-white !text-neutral-dark hover:!bg-gray-100 absolute right-4"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="p-6 border-t-2 border-neutral-light bg-neutral-light">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
