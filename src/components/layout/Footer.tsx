import React from 'react';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-dark text-white mt-auto" role="contentinfo">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sobre el proyecto */}
          <div>
            <h3 className="font-bold text-lg mb-4">
              {t('app.title')}
            </h3>
            <p className="text-sm text-gray-300 mb-3">
              Portal de pagos municipales con tecnología blockchain BSV y protocolo X402.
            </p>
            <div className="flex gap-3">
              <span className="px-2 py-1 bg-primary rounded text-xs font-bold">
                WCAG 2.2 AAA
              </span>
              <span className="px-2 py-1 bg-feedback-success rounded text-xs font-bold">
                BSV
              </span>
              <span className="px-2 py-1 bg-secondary rounded text-xs font-bold">
                X402
              </span>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="font-bold text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 list-none m-0 p-0">
              <li>
                <a href="/" className="text-sm text-gray-100 hover:text-white hover:underline font-medium">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/services" className="text-sm text-gray-100 hover:text-white hover:underline font-medium">
                  Servicios
                </a>
              </li>
              <li>
                <a href="/payments" className="text-sm text-gray-100 hover:text-white hover:underline font-medium">
                  Mis Pagos
                </a>
              </li>
              <li>
                <a href="/help" className="text-sm text-gray-100 hover:text-white hover:underline font-medium">
                  Ayuda
                </a>
              </li>
            </ul>
          </div>

          {/* Accesibilidad */}
          <div>
            <h3 className="font-bold text-lg mb-4">Accesibilidad</h3>
            <ul className="space-y-2 list-none m-0 p-0">
              <li className="text-sm text-gray-300">
                ✅ Contraste 7:1 (AAA)
              </li>
              <li className="text-sm text-gray-300">
                ⌨️ Navegación por teclado
              </li>
              <li className="text-sm text-gray-300">
                🔊 Lectura en voz alta
              </li>
              <li className="text-sm text-gray-300">
                🌐 Multilingüe (ES/EN)
              </li>
              <li className="text-sm text-gray-300">
                📱 Diseño responsive
              </li>
            </ul>
          </div>

          {/* Información legal */}
          <div>
            <h3 className="font-bold text-lg mb-4">Información</h3>
            <ul className="space-y-2 list-none m-0 p-0">
              <li>
                <a href="/privacy" className="text-sm text-gray-100 hover:text-white hover:underline font-medium">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="/terms" className="text-sm text-gray-100 hover:text-white hover:underline font-medium">
                  Términos de Uso
                </a>
              </li>
              <li>
                <a href="/cookies" className="text-sm text-gray-100 hover:text-white hover:underline font-medium">
                  Política de Cookies
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm text-gray-100 hover:text-white hover:underline font-medium">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Tecnologías */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              <p className="mb-2">Desarrollado con:</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-gray-800 rounded text-xs">React 18</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-xs">TypeScript</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-xs">Tailwind CSS</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-xs">BSV SDK</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-xs">i18next</span>
              </div>
            </div>

            <div className="text-sm text-gray-400 text-center md:text-right">
              <p>
                © {currentYear} Portal de Pagos Municipales. Todos los derechos reservados.
              </p>
              <p className="mt-2 text-xs">
                Proyecto para Web3 Hackathon 2025 - BSV Association
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
