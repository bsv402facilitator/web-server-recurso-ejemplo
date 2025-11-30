import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useWallet } from '../../contexts/WalletContext';
import { AccessibilityPanel } from '../accessibility/AccessibilityPanel';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const { wallet, connect, disconnect, isConnecting } = useWallet();
  const [showAccessibilityPanel, setShowAccessibilityPanel] = useState(false);

  const handleWalletAction = () => {
    if (wallet.connected) {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <>
      <header className="bg-white border-b-4 border-primary shadow-md" role="banner">
        {/* Skip to content link (WCAG AAA) */}
        <a href="#main-content" className="skip-to-main">
          {t('common.skip_to_content')}
        </a>

        <div className="container mx-auto px-4">
          {/* Top bar */}
          <div className="py-3 border-b border-neutral-light">
            <div className="flex items-center justify-between">
              {/* Logo y título */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">M</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-neutral-dark m-0">
                    {t('app.title')}
                  </h1>
                  <p className="text-sm text-neutral-gray m-0">
                    {t('app.subtitle')}
                  </p>
                </div>
              </div>

              {/* Wallet y Accesibilidad */}
              <div className="flex items-center gap-3">
                {/* Botón de accesibilidad */}
                <Button
                  variant="accessibility"
                  size="sm"
                  onClick={() => setShowAccessibilityPanel(true)}
                  aria-label={t('nav.accessibility')}
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  }
                >
                  {t('nav.accessibility')}
                </Button>

                {/* Wallet Button */}
                {wallet.connected ? (
                  <div className="flex items-center gap-2 px-4 py-2 bg-feedback-success bg-opacity-10 border-2 border-feedback-success rounded">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-feedback-success rounded-full" aria-hidden="true" />
                      <div>
                        <p className="text-xs font-semibold text-feedback-success">
                          {t('wallet.connected')}
                        </p>
                        <p className="text-xs text-neutral-gray">
                          {wallet.balance?.toLocaleString() || 0} sats
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleWalletAction}
                    >
                      {t('wallet.disconnect')}
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleWalletAction}
                    loading={isConnecting}
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    }
                  >
                    {t('wallet.connect')}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="py-4" role="navigation" aria-label="Navegación principal">
            <ul className="flex gap-6 list-none m-0 p-0">
              <li>
                <a
                  href="/"
                  className="font-semibold text-neutral-dark hover:text-primary transition-colors"
                >
                  🏠 {t('nav.home')}
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="font-semibold text-neutral-dark hover:text-primary transition-colors"
                >
                  📋 {t('nav.services')}
                </a>
              </li>
              <li>
                <a
                  href="/payments"
                  className="font-semibold text-neutral-dark hover:text-primary transition-colors"
                >
                  💳 {t('nav.payments')}
                </a>
              </li>
              <li>
                <a
                  href="/help"
                  className="font-semibold text-neutral-dark hover:text-primary transition-colors"
                >
                  ❓ {t('nav.help')}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Breadcrumbs (estilo Comunidad de Madrid) */}
        <div className="bg-neutral-light py-2">
          <div className="container mx-auto px-4">
            <nav aria-label="Breadcrumb">
              <ol className="flex gap-2 text-sm list-none m-0 p-0">
                <li>
                  <a href="/" className="text-primary hover:underline">
                    Inicio
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <span className="text-neutral-gray">Portal de Pagos</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </header>

      {/* Accessibility Panel Modal */}
      <AccessibilityPanel
        isOpen={showAccessibilityPanel}
        onClose={() => setShowAccessibilityPanel(false)}
      />
    </>
  );
};
