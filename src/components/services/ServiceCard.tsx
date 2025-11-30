import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import type { Service } from '../../types/services';
import { useAccessibility } from '../../contexts/useAccessibility';

interface ServiceCardProps {
  service: Service;
  onSelect: (service: Service) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect }) => {
  const { t, i18n } = useTranslation();
  const { settings } = useAccessibility();
  const lang = i18n.language as 'es' | 'en';

  const formatPrice = (satoshis: number, eur: number) => {
    if (settings.level === 'simple') {
      return `${eur.toFixed(2)} €`;
    }
    if (settings.level === 'technical') {
      return `${satoshis.toLocaleString()} sats (${eur.toFixed(2)} €)`;
    }
    return `${eur.toFixed(2)} € / ${satoshis.toLocaleString()} sats`;
  };

  const getCategoryIcon = () => {
    const icons = {
      taxes: '💰',
      fines: '⚠️',
      administrative: '📄',
      'public-services': '🏛️',
    };
    return icons[service.category] || '📋';
  };

  return (
    <Card
      className="h-full"
      role="article"
      ariaLabel={`${service.name[lang]} - ${formatPrice(service.price, service.priceEur)}`}
    >
      <div className="flex flex-col h-full">
        {/* Icono y categoría */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl" role="img" aria-label={t(`services.categories.${service.category}`)}>
            {getCategoryIcon()}
          </span>
          <span className="text-sm font-semibold text-secondary px-3 py-1 bg-neutral-light rounded">
            {t(`services.categories.${service.category}`)}
          </span>
        </div>

        {/* Nombre del servicio */}
        <h3 className="text-xl font-bold text-neutral-dark mb-2">
          {service.name[lang]}
        </h3>

        {/* Descripción */}
        <p className="text-base text-neutral-gray mb-4 flex-grow">
          {service.description[lang]}
        </p>

        {/* Metadata (si existe) */}
        {service.metadata && (
          <div className="mb-4 p-3 bg-neutral-light rounded text-sm">
            {service.metadata.period && (
              <p className="mb-1">
                <strong>{t('common.period')}:</strong> {service.metadata.period}
              </p>
            )}
            {service.metadata.deadline && (
              <p className="mb-1">
                <strong>{t('common.deadline')}:</strong> {service.metadata.deadline}
              </p>
            )}
            {service.estimatedTime && (
              <p>
                <strong>{t('common.estimated_time')}:</strong> {service.estimatedTime}
              </p>
            )}
          </div>
        )}

        {/* Precio */}
        <div className="mb-4 p-4 bg-primary bg-opacity-5 border-2 border-primary rounded">
          <p className="text-sm font-semibold text-neutral-gray mb-1">
            {t('payment.amount')}
          </p>
          <p className="text-2xl font-bold text-primary">
            {formatPrice(service.price, service.priceEur)}
          </p>
        </div>

        {/* Botón de pago */}
        <Button
          variant="primary"
          fullWidth
          onClick={() => onSelect(service)}
          aria-label={`${t('payment.confirm')} ${service.name[lang]}`}
        >
          {service.price === 0 ? t('common.request') : t('payment.confirm')}
        </Button>
      </div>
    </Card>
  );
};
