/**
 * Catálogo de servicios municipales disponibles
 */

import type { Service } from '../types/services';

export const MUNICIPAL_SERVICES: Service[] = [
  // TASAS E IMPUESTOS
  {
    id: 'ibi-2024',
    type: 'ibi',
    category: 'taxes',
    name: {
      es: 'Impuesto de Bienes Inmuebles (IBI) 2024',
      en: 'Real Estate Tax (IBI) 2024',
    },
    description: {
      es: 'Pago del Impuesto de Bienes Inmuebles correspondiente al ejercicio 2024',
      en: 'Payment of Real Estate Tax for the year 2024',
    },
    price: 50000, // 50,000 satoshis
    priceEur: 25.50,
    requiresAuth: true,
    estimatedTime: '2-5 minutos',
    metadata: {
      period: '2024',
      deadline: '2024-12-31',
    },
  },
  {
    id: 'garbage-2024',
    type: 'garbage',
    category: 'taxes',
    name: {
      es: 'Tasa de Basuras 2024',
      en: 'Garbage Fee 2024',
    },
    description: {
      es: 'Pago de la tasa municipal de recogida de basuras',
      en: 'Payment of municipal garbage collection fee',
    },
    price: 15000, // 15,000 satoshis
    priceEur: 7.65,
    requiresAuth: true,
    estimatedTime: '2-5 minutos',
    metadata: {
      period: '2024',
    },
  },
  {
    id: 'plusvalia',
    type: 'plusvalia',
    category: 'taxes',
    name: {
      es: 'Impuesto sobre el Incremento del Valor de los Terrenos',
      en: 'Capital Gains Tax on Land',
    },
    description: {
      es: 'Plusvalía municipal - Impuesto sobre la transmisión de terrenos',
      en: 'Municipal capital gains tax on land transfer',
    },
    price: 120000, // 120,000 satoshis
    priceEur: 61.20,
    requiresAuth: true,
    estimatedTime: '5-10 minutos',
  },

  // MULTAS
  {
    id: 'traffic-fine',
    type: 'traffic-fine',
    category: 'fines',
    name: {
      es: 'Multa de Tráfico',
      en: 'Traffic Fine',
    },
    description: {
      es: 'Pago de multas de tráfico y estacionamiento',
      en: 'Payment of traffic and parking fines',
    },
    price: 30000, // 30,000 satoshis
    priceEur: 15.30,
    requiresAuth: false,
    estimatedTime: '1-3 minutos',
  },
  {
    id: 'admin-fine',
    type: 'admin-fine',
    category: 'fines',
    name: {
      es: 'Infracción Administrativa',
      en: 'Administrative Violation',
    },
    description: {
      es: 'Pago de infracciones y sanciones administrativas',
      en: 'Payment of administrative violations and penalties',
    },
    price: 40000, // 40,000 satoshis
    priceEur: 20.40,
    requiresAuth: false,
    estimatedTime: '1-3 minutos',
  },

  // SERVICIOS ADMINISTRATIVOS
  {
    id: 'certificate',
    type: 'certificate',
    category: 'administrative',
    name: {
      es: 'Certificado Municipal',
      en: 'Municipal Certificate',
    },
    description: {
      es: 'Emisión de certificados de empadronamiento, residencia, etc.',
      en: 'Issuance of registration, residence certificates, etc.',
    },
    price: 5000, // 5,000 satoshis
    priceEur: 2.55,
    requiresAuth: true,
    estimatedTime: '1-2 minutos',
  },
  {
    id: 'license',
    type: 'license',
    category: 'administrative',
    name: {
      es: 'Licencia de Actividad',
      en: 'Business License',
    },
    description: {
      es: 'Solicitud y pago de licencias de apertura y actividad',
      en: 'Application and payment for opening and activity licenses',
    },
    price: 80000, // 80,000 satoshis
    priceEur: 40.80,
    requiresAuth: true,
    estimatedTime: '10-15 minutos',
  },
  {
    id: 'registry',
    type: 'registry',
    category: 'administrative',
    name: {
      es: 'Padrón Municipal',
      en: 'Municipal Registry',
    },
    description: {
      es: 'Alta en el padrón de habitantes',
      en: 'Registration in the municipal registry',
    },
    price: 0, // Gratuito
    priceEur: 0,
    requiresAuth: true,
    estimatedTime: '5 minutos',
  },

  // SERVICIOS PÚBLICOS
  {
    id: 'water',
    type: 'water',
    category: 'public-services',
    name: {
      es: 'Factura de Agua',
      en: 'Water Bill',
    },
    description: {
      es: 'Pago de la factura municipal de agua',
      en: 'Payment of municipal water bill',
    },
    price: 25000, // 25,000 satoshis
    priceEur: 12.75,
    requiresAuth: true,
    estimatedTime: '2-5 minutos',
    metadata: {
      period: 'Bimestral',
    },
  },
  {
    id: 'transport',
    type: 'transport',
    category: 'public-services',
    name: {
      es: 'Abono de Transporte',
      en: 'Transport Pass',
    },
    description: {
      es: 'Recarga del abono de transporte público',
      en: 'Reload of public transport pass',
    },
    price: 35000, // 35,000 satoshis
    priceEur: 17.85,
    requiresAuth: true,
    estimatedTime: '1-2 minutos',
    metadata: {
      period: 'Mensual',
    },
  },
  {
    id: 'sports',
    type: 'sports',
    category: 'public-services',
    name: {
      es: 'Instalaciones Deportivas',
      en: 'Sports Facilities',
    },
    description: {
      es: 'Reserva y pago de instalaciones deportivas municipales',
      en: 'Reservation and payment for municipal sports facilities',
    },
    price: 8000, // 8,000 satoshis
    priceEur: 4.08,
    requiresAuth: true,
    estimatedTime: '1-3 minutos',
  },
  {
    id: 'culture',
    type: 'culture',
    category: 'public-services',
    name: {
      es: 'Actividades Culturales',
      en: 'Cultural Activities',
    },
    description: {
      es: 'Inscripción en talleres y actividades culturales',
      en: 'Registration for workshops and cultural activities',
    },
    price: 10000, // 10,000 satoshis
    priceEur: 5.10,
    requiresAuth: true,
    estimatedTime: '1-3 minutos',
  },
];

/**
 * Obtiene servicios por categoría
 */
export const getServicesByCategory = (category: string): Service[] => {
  return MUNICIPAL_SERVICES.filter(service => service.category === category);
};

/**
 * Obtiene un servicio por ID
 */
export const getServiceById = (id: string): Service | undefined => {
  return MUNICIPAL_SERVICES.find(service => service.id === id);
};

/**
 * Busca servicios por nombre
 */
export const searchServices = (query: string, lang: 'es' | 'en' = 'es'): Service[] => {
  const lowerQuery = query.toLowerCase();
  return MUNICIPAL_SERVICES.filter(service =>
    service.name[lang].toLowerCase().includes(lowerQuery) ||
    service.description[lang].toLowerCase().includes(lowerQuery)
  );
};
