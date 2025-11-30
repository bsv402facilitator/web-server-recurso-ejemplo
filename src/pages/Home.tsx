import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useWallet } from '../contexts/WalletContext';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { wallet, connect } = useWallet();

  const features = [
    { icon: '⚡', title: 'Pagos Instantáneos', desc: 'Confirmación en segundos con blockchain BSV' },
    { icon: '💰', title: 'Tarifas Mínimas', desc: 'Costos de transacción de céntimos' },
    { icon: '🔒', title: '100% Seguro', desc: 'Tecnología blockchain inmutable' },
    { icon: '♿', title: 'Accesible', desc: 'WCAG 2.2 AAA - Para todas las personas' },
    { icon: '🌐', title: 'Multilingüe', desc: 'Disponible en español e inglés' },
    { icon: '📱', title: 'Responsive', desc: 'Funciona en todos los dispositivos' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {t('app.title')}
          </h1>
          <p className="text-2xl md:text-3xl mb-8 font-semibold">
            {t('app.subtitle')}
          </p>
          <p className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed">
            Primera plataforma de pagos municipales con protocolo X402 y extensión de accesibilidad universal
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {!wallet.connected && (
              <Button variant="primary" size="lg" onClick={connect}>
                🚀 Comenzar Ahora
              </Button>
            )}
            <Button variant="outline" size="lg" onClick={() => window.location.href = '/services'}>
              📋 Ver Servicios
            </Button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-4 text-neutral-dark">
          ¿Por qué usar este portal?
        </h2>
        <p className="text-center text-xl text-neutral-gray mb-12 max-w-3xl mx-auto">
          Descubre las ventajas de usar blockchain para tus pagos municipales
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <Card key={i}>
              <div className="text-center p-4">
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-neutral-dark">{feature.title}</h3>
                <p className="text-neutral-gray leading-relaxed">{feature.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* X402 Flow */}
      <div className="bg-neutral-light py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-neutral-dark">
            Flujo de Pago X402
          </h2>
          <p className="text-center text-xl text-neutral-gray mb-12 max-w-3xl mx-auto">
            Proceso simple y seguro en 4 pasos
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg">1</div>
              <h3 className="font-bold mb-3 text-lg text-neutral-dark">Request</h3>
              <p className="text-base text-neutral-gray leading-relaxed">Solicita el servicio</p>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg">2</div>
              <h3 className="font-bold mb-3 text-lg text-neutral-dark">402 Payment</h3>
              <p className="text-base text-neutral-gray leading-relaxed">Se requiere pago</p>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg">3</div>
              <h3 className="font-bold mb-3 text-lg text-neutral-dark">Pay</h3>
              <p className="text-base text-neutral-gray leading-relaxed">Confirma el pago</p>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <div className="w-20 h-20 bg-feedback-success text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg">✓</div>
              <h3 className="font-bold mb-3 text-lg text-neutral-dark">Access</h3>
              <p className="text-base text-neutral-gray leading-relaxed">Servicio completado</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6 text-neutral-dark">
          ¿Listo para empezar?
        </h2>
        <p className="text-xl text-neutral-gray mb-10 max-w-2xl mx-auto leading-relaxed">
          Conecta tu wallet BSV y realiza tu primer pago municipal en blockchain
        </p>
        <Button variant="primary" size="lg" onClick={connect} disabled={wallet.connected}>
          {wallet.connected ? '✅ Wallet Conectada' : '🔗 Conectar Wallet'}
        </Button>
      </div>
    </div>
  );
};
