import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ServiceCard } from '../components/services/ServiceCard';
import { PaymentFlow } from '../components/payment/PaymentFlow';
import { MUNICIPAL_SERVICES, getServicesByCategory } from '../data/services';
import type { Service, ServiceCategory } from '../types/services';

export const ServicesPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showPaymentFlow, setShowPaymentFlow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');

  const categories: (ServiceCategory | 'all')[] = ['all', 'taxes', 'fines', 'administrative', 'public-services'];

  const filteredServices = selectedCategory === 'all'
    ? MUNICIPAL_SERVICES
    : getServicesByCategory(selectedCategory);

  const handleSelectService = (service: Service) => {
    setSelectedService(service);
    setShowPaymentFlow(true);
  };

  const handlePaymentSuccess = (txid: string) => {
    console.log('Payment successful:', txid);
    // Aquí podrías redirigir a una página de éxito o mostrar un mensaje
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Título */}
      <div className="mb-10 text-center">
        <h1 className="text-5xl font-bold text-neutral-dark mb-4">
          {t('services.title')}
        </h1>
        <p className="text-xl text-neutral-gray max-w-3xl mx-auto leading-relaxed">
          Selecciona el servicio que deseas pagar con blockchain BSV
        </p>
      </div>

      {/* Filtros por categoría */}
      <div className="mb-10">
        <label className="font-bold text-xl mb-4 block text-center text-neutral-dark">
          {t('common.filter_by_category')}
        </label>
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-lg font-bold transition-all border-2 shadow-md hover:shadow-lg ${
                selectedCategory === category
                  ? 'bg-primary text-white border-primary scale-105'
                  : 'bg-white text-neutral-dark border-neutral-light hover:border-primary'
              }`}
              aria-pressed={selectedCategory === category}
            >
              {category === 'all' ? t('common.all_categories') : t(`services.categories.${category}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de servicios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map(service => (
          <ServiceCard
            key={service.id}
            service={service}
            onSelect={handleSelectService}
          />
        ))}
      </div>

      {/* Modal de pago */}
      <PaymentFlow
        service={selectedService}
        isOpen={showPaymentFlow}
        onClose={() => setShowPaymentFlow(false)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};
