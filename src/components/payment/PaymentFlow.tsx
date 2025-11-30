import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import type { Service } from '../../types/services';
import type { PaymentStatus } from '../../types/payment';
import { useWallet } from '../../contexts/wallet/WalletContext';
import { useAccessibility } from '../../contexts/accessibility/useAccessibility';
import { mockX402Service } from '../../services/mock-x402';

interface PaymentFlowProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (txid: string) => void;
}

export const PaymentFlow: React.FC<PaymentFlowProps> = ({
  service,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { t, i18n } = useTranslation();
  const { wallet, signTransaction } = useWallet();
  const { settings, speak } = useAccessibility();
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [txid, setTxid] = useState<string | null>(null);

  // Configurar mock service con preferencias de accesibilidad
  useEffect(() => {
    mockX402Service.setAccessibilityLevel(settings.level);
    mockX402Service.setLanguage(settings.language);
  }, [settings.level, settings.language]);

  const handlePayment = async () => {
    if (!service || !wallet.connected) return;

    try {
      setError(null);

      // Paso 1: Request
      setStatus('requesting');
      announce(t('payment.status.requesting'));

      const x402Response = await mockX402Service.requestResource(`/api/services/${service.id}`);

      if (x402Response.status === 402) {
        // Paso 2: Payment Required
        setStatus('payment-required');
        announce(t('payment.status.payment_required'));

        // Esperar un momento para que el usuario vea el estado
        await delay(1000);

        // Paso 3: Sign transaction
        setStatus('signing');
        announce(t('payment.status.signing'));

        const signedTx = await signTransaction({
          outputs: [{
            satoshis: service.price,
            script: x402Response.headers['X-PAYMENT-ADDRESS'] || '',
          }],
          fee: 50,
        });

        // Paso 4: Broadcast
        setStatus('broadcasting');
        announce(t('payment.status.broadcasting'));

        const confirmation = await mockX402Service.submitPayment(
          {
            service,
            amount: service.price,
            paymentAddress: x402Response.headers['X-PAYMENT-ADDRESS'] || '',
            network: 'testnet',
          },
          signedTx
        );

        // Paso 5: Confirming
        setStatus('confirming');
        announce(t('payment.status.confirming'));
        setTxid(confirmation.txid);

        // Simular espera de confirmación
        await delay(2000);

        // Paso 6: Confirmed
        setStatus('confirmed');
        announce(t('payment.success'));

        // Anunciar detalles con accesibilidad
        if (confirmation.accessibility) {
          speak(confirmation.accessibility.plainLanguage);
        }

        // Esperar antes de cerrar
        await delay(2000);
        onSuccess(confirmation.txid);
        handleClose();
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('payment.error');
      setError(errorMessage);
      setStatus('failed');
      announce(`${t('errors.generic')}: ${errorMessage}`);
    }
  };

  const handleClose = () => {
    setStatus('idle');
    setError(null);
    setTxid(null);
    onClose();
  };

  const announce = (message: string) => {
    if (settings.textToSpeechEnabled) {
      speak(message);
    }
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const getStatusIcon = () => {
    const icons = {
      idle: '⏸️',
      requesting: '🔄',
      'payment-required': '💳',
      signing: '✍️',
      broadcasting: '📡',
      confirming: '⏳',
      confirmed: '✅',
      failed: '❌',
    };
    return icons[status] || '⏸️';
  };

  const getStatusColor = () => {
    const colors = {
      idle: 'text-neutral-gray',
      requesting: 'text-info',
      'payment-required': 'text-warning',
      signing: 'text-info',
      broadcasting: 'text-info',
      confirming: 'text-info',
      confirmed: 'text-success',
      failed: 'text-error',
    };
    return colors[status] || 'text-neutral-gray';
  };

  if (!service) return null;

  const lang = i18n.language as 'es' | 'en';

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={t('payment.title')}
      size="md"
      closeOnOverlayClick={status === 'idle' || status === 'confirmed' || status === 'failed'}
    >
      <div className="space-y-6">
        {/* Información del servicio */}
        <div className="p-6 bg-neutral-light rounded-lg shadow-sm">
          <h4 className="font-bold text-xl mb-3 text-center text-neutral-dark">{service.name[lang]}</h4>
          <p className="text-neutral-gray mb-4 text-center leading-relaxed">{service.description[lang]}</p>
          <div className="flex flex-col gap-2 items-center p-4 bg-white rounded-lg">
            <span className="font-semibold text-neutral-gray">{t('payment.amount')}:</span>
            <span className="text-3xl font-bold text-primary">
              {service.priceEur.toFixed(2)} €
            </span>
            <span className="text-sm text-neutral-gray">
              ({service.price.toLocaleString()} sats)
            </span>
          </div>
        </div>

        {/* Estado del pago */}
        <div className="p-8 bg-white border-2 border-neutral-light rounded-lg text-center shadow-md">
          <div className={`text-7xl mb-6 ${getStatusColor()}`} role="img" aria-label={t(`payment.status.${status}`)}>
            {getStatusIcon()}
          </div>
          <h3 className={`text-2xl font-bold mb-4 ${getStatusColor()}`}>
            {t(`payment.status.${status}`)}
          </h3>

          {/* Progress bar para estados en progreso */}
          {status !== 'idle' && status !== 'confirmed' && status !== 'failed' && (
            <div className="mt-6 w-full max-w-md mx-auto bg-neutral-light rounded-full h-3">
              <div className="bg-primary h-3 rounded-full animate-pulse" style={{ width: '60%' }} />
            </div>
          )}

          {/* TxID cuando está disponible */}
          {txid && (
            <div className="mt-6 p-4 bg-neutral-light rounded-lg max-w-2xl mx-auto">
              <p className="text-base font-bold mb-2 text-neutral-dark">Transaction ID:</p>
              <p className="text-sm font-mono break-all text-neutral-gray">{txid}</p>
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="p-6 bg-feedback-error bg-opacity-10 border-2 border-feedback-error rounded-lg text-center shadow-md" role="alert">
            <div className="text-4xl mb-3">❌</div>
            <p className="font-bold text-feedback-error mb-3 text-lg">{t('errors.generic')}</p>
            <p className="text-base text-neutral-dark">{error}</p>
          </div>
        )}

        {/* Wallet info */}
        {wallet.connected && (
          <div className="p-4 bg-neutral-light rounded-lg text-center shadow-sm">
            <p className="mb-3 text-base">
              <strong className="text-neutral-dark">{t('wallet.balance')}:</strong>{' '}
              <span className="font-bold text-primary">{wallet.balance?.toLocaleString() || 0} sats</span>
            </p>
            <p className="text-sm text-neutral-gray break-all">
              <strong>{t('wallet.address')}:</strong> {wallet.address}
            </p>
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex gap-3">
          {status === 'idle' && (
            <>
              <Button variant="outline" fullWidth onClick={handleClose}>
                {t('common.cancel')}
              </Button>
              <Button
                variant="primary"
                fullWidth
                onClick={handlePayment}
                disabled={!wallet.connected}
              >
                {t('payment.confirm')}
              </Button>
            </>
          )}

          {(status === 'confirmed' || status === 'failed') && (
            <Button variant="primary" fullWidth onClick={handleClose}>
              {t('common.close')}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
