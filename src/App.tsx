import React, { useEffect } from 'react';
import { AccessibilityProvider } from './contexts/accessibility/AccessibilityProvider';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/Home';
import { ServicesPage } from './pages/Services';
import './i18n/config';

// Importar estilos de temas
import './styles/themes/default.css';
import './styles/themes/high-contrast.css';
import './styles/themes/simplified.css';

// Importar mock wallet
import './services/mock-wallet';
import { WalletProvider } from './contexts/wallet/WalletProvider';

function App() {
  const [currentPage, setCurrentPage] = React.useState<'home' | 'services' | 'payments' | 'help'>('home');

  // Simple hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home';
      setCurrentPage(hash as typeof currentPage);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial load

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Override navigation links to use hash routing
  useEffect(() => {
    const links = document.querySelectorAll('a[href^="/"]');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href) {
        link.setAttribute('href', `#${href.slice(1) || 'home'}`);
      }
    });
  });

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'services':
        return <ServicesPage />;
      case 'payments':
        return (
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl font-bold mb-4">💳 Mis Pagos</h1>
            <p className="text-xl text-neutral-gray mb-8">
              Aquí podrás ver tu historial de pagos realizados
            </p>
            <div className="p-8 bg-neutral-light rounded">
              <p className="text-neutral-gray">
                Esta sección está en desarrollo. Conecta tu wallet para ver tus transacciones.
              </p>
            </div>
          </div>
        );
      case 'help':
        return (
          <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-8">❓ Ayuda</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-white border-2 border-neutral-light rounded">
                <h2 className="text-2xl font-bold mb-4">🔗 ¿Cómo conectar mi wallet?</h2>
                <ol className="space-y-2 list-decimal pl-5">
                  <li>Haz clic en "Conectar Wallet" en la parte superior</li>
                  <li>Autoriza la conexión en tu extensión de wallet BSV</li>
                  <li>Una vez conectada, verás tu saldo y dirección</li>
                </ol>
              </div>
              <div className="p-6 bg-white border-2 border-neutral-light rounded">
                <h2 className="text-2xl font-bold mb-4">💰 ¿Cómo realizar un pago?</h2>
                <ol className="space-y-2 list-decimal pl-5">
                  <li>Ve a la sección "Servicios"</li>
                  <li>Selecciona el servicio que deseas pagar</li>
                  <li>Revisa el importe y confirma</li>
                  <li>Firma la transacción en tu wallet</li>
                  <li>Espera la confirmación (2-5 segundos)</li>
                </ol>
              </div>
              <div className="p-6 bg-white border-2 border-neutral-light rounded">
                <h2 className="text-2xl font-bold mb-4">♿ Opciones de Accesibilidad</h2>
                <p className="mb-3">
                  Este portal cumple con WCAG 2.2 AAA. Puedes personalizar:
                </p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Tema visual (Default, Alto Contraste, Simplificado)</li>
                  <li>Tamaño de texto</li>
                  <li>Lectura en voz alta</li>
                  <li>Nivel de detalle de información</li>
                  <li>Reducción de movimiento</li>
                </ul>
              </div>
              <div className="p-6 bg-white border-2 border-neutral-light rounded">
                <h2 className="text-2xl font-bold mb-4">🔒 Seguridad</h2>
                <p className="mb-3">
                  Tus pagos son seguros gracias a:
                </p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Blockchain BSV inmutable</li>
                  <li>Protocolo X402 estándar</li>
                  <li>Confirmaciones en blockchain pública</li>
                  <li>Sin custodia de fondos</li>
                </ul>
              </div>
            </div>
          </div>
        );
      default:
        return <HomePage />;
    }
  };

  return (
    <AccessibilityProvider>
      <WalletProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main id="main-content" className="flex-grow">
            {renderPage()}
          </main>
          <Footer />
        </div>
      </WalletProvider>
    </AccessibilityProvider>
  );
}

export default App;
