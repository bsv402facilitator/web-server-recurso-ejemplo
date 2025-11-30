/**
 * Tipos para servicios municipales
 */

export type ServiceCategory =
  | 'taxes'           // Tasas e impuestos
  | 'fines'          // Multas y sanciones
  | 'administrative'  // Servicios administrativos
  | 'public-services'; // Servicios públicos

export type ServiceType =
  // Tasas e impuestos
  | 'ibi'           // Impuesto de Bienes Inmuebles
  | 'garbage'       // Tasa de basuras
  | 'plusvalia'     // Plusvalía
  // Multas
  | 'traffic-fine'  // Multas de tráfico
  | 'admin-fine'    // Infracciones administrativas
  // Administrativos
  | 'certificate'   // Certificados
  | 'license'       // Licencias
  | 'registry'      // Padrón
  // Públicos
  | 'water'         // Agua
  | 'transport'     // Transporte
  | 'sports'        // Instalaciones deportivas
  | 'culture';      // Actividades culturales

export interface Service {
  id: string;
  type: ServiceType;
  category: ServiceCategory;
  name: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  price: number; // En satoshis
  priceEur: number; // Equivalente en EUR (referencia)
  icon?: string;
  requiresAuth: boolean;
  estimatedTime?: string; // Tiempo estimado de procesamiento
  metadata?: {
    reference?: string; // Número de referencia
    period?: string; // Periodo (ej: 2024)
    deadline?: string; // Fecha límite
  };
}

export interface ServicePaymentData {
  service: Service;
  userReference?: string;
  customAmount?: number;
  metadata?: Record<string, string>;
}
