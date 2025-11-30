/**
 * Servicio de comunicación con el Facilitador BSV X402
 *
 * Implementa el flujo X402:
 * 1. Request → 2. 402 Payment Required → 3. Pay → 4. Access
 */

import type {
  X402Response,
  PaymentRequest,
  PaymentConfirmation,
  PaymentError,
  BSVTransaction,
} from '../types/payment';
import type { AccessibilityLevel, Language } from '../types/accessibility';

const FACILITATOR_URL = import.meta.env.VITE_FACILITATOR_URL || 'https://facilitador-bsv-x402-accesible.com';
const RESOURCE_SERVER_URL = import.meta.env.VITE_RESOURCE_SERVER_URL || 'https://x402-resource-server-accesible-prod.com';

export class X402FacilitatorService {
  private accessibilityLevel: AccessibilityLevel = 'standard';
  private language: Language = 'es';

  /**
   * Configura el nivel de accesibilidad para las respuestas
   */
  setAccessibilityLevel(level: AccessibilityLevel): void {
    this.accessibilityLevel = level;
  }

  /**
   * Configura el idioma para las respuestas
   */
  setLanguage(language: Language): void {
    this.language = language;
  }

  /**
   * Paso 1: Request - Solicita el recurso protegido
   */
  async requestResource(resourcePath: string): Promise<X402Response> {
    try {
      const response = await fetch(`${RESOURCE_SERVER_URL}${resourcePath}`, {
        method: 'GET',
        headers: {
          'X-ACCESSIBILITY-LEVEL': this.accessibilityLevel,
          'X-LANGUAGE': this.language,
        },
      });

      // Esperamos un 402 Payment Required
      if (response.status === 402) {
        return {
          status: 402,
          headers: {
            'X-PAYMENT-AMOUNT': response.headers.get('X-PAYMENT-AMOUNT') || undefined,
            'X-PAYMENT-ADDRESS': response.headers.get('X-PAYMENT-ADDRESS') || undefined,
            'X-PAYMENT-NETWORK': response.headers.get('X-PAYMENT-NETWORK') || undefined,
            'X-ACCESSIBILITY-LEVEL': response.headers.get('X-ACCESSIBILITY-LEVEL') || undefined,
            'X-LANGUAGE': response.headers.get('X-LANGUAGE') || undefined,
          },
          body: await response.json().catch(() => ({})),
          accessibility: await this.extractAccessibilityMetadata(response),
        };
      }

      // Si no es 402, es un error o ya tenemos acceso
      const body = await response.json().catch(() => ({}));
      return {
        status: response.status,
        headers: {},
        body,
      };
    } catch (error) {
      console.error('Error requesting resource:', error);
      throw this.formatError(error);
    }
  }

  /**
   * Paso 2-3: Pay - Crea y envía el pago
   */
  async submitPayment(paymentRequest: PaymentRequest, signedTx: BSVTransaction): Promise<PaymentConfirmation> {
    try {
      const response = await fetch(`${FACILITATOR_URL}/api/v1/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-ACCESSIBILITY-LEVEL': this.accessibilityLevel,
          'X-LANGUAGE': this.language,
          'X-PAYMENT': signedTx.rawtx, // La transacción firmada en raw hex
        },
        body: JSON.stringify({
          service: paymentRequest.service,
          amount: paymentRequest.amount,
          reference: paymentRequest.reference,
          txid: signedTx.txid,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error processing payment');
      }

      const data = await response.json();

      return {
        txid: signedTx.txid,
        service: paymentRequest.service,
        amount: paymentRequest.amount,
        timestamp: Date.now(),
        confirmations: 0,
        receipt: data.receipt,
        accessibility: data.accessibility || {
          plainLanguage: this.language === 'es' ? 'Pago completado exitosamente' : 'Payment completed successfully',
          stepByStep: [
            this.language === 'es' ? 'Transacción firmada' : 'Transaction signed',
            this.language === 'es' ? 'Pago transmitido a blockchain' : 'Payment broadcast to blockchain',
            this.language === 'es' ? 'Confirmación recibida' : 'Confirmation received',
          ],
        },
      };
    } catch (error) {
      console.error('Error submitting payment:', error);
      throw this.formatError(error);
    }
  }

  /**
   * Paso 4: Access - Obtiene el recurso después del pago
   */
  async accessResource(resourcePath: string, paymentProof: string): Promise<unknown> {
    try {
      const response = await fetch(`${RESOURCE_SERVER_URL}${resourcePath}`, {
        method: 'GET',
        headers: {
          'X-PAYMENT-PROOF': paymentProof,
          'X-ACCESSIBILITY-LEVEL': this.accessibilityLevel,
          'X-LANGUAGE': this.language,
        },
      });

      if (!response.ok) {
        throw new Error(`Error accessing resource: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error accessing resource:', error);
      throw this.formatError(error);
    }
  }

  /**
   * Verifica el estado de una transacción
   */
  async checkTransactionStatus(txid: string): Promise<{ confirmed: boolean; confirmations: number }> {
    try {
      // Usa WhatsOnChain API para verificar el estado
      const response = await fetch(`https://api.whatsonchain.com/v1/bsv/test/tx/${txid}`);

      if (!response.ok) {
        throw new Error('Transaction not found');
      }

      const data = await response.json();

      return {
        confirmed: data.confirmations > 0,
        confirmations: data.confirmations || 0,
      };
    } catch (error) {
      console.error('Error checking transaction status:', error);
      return {
        confirmed: false,
        confirmations: 0,
      };
    }
  }

  /**
   * Obtiene el historial de pagos del usuario
   */
  async getPaymentHistory(address: string): Promise<PaymentConfirmation[]> {
    try {
      const response = await fetch(`${FACILITATOR_URL}/api/v1/payments/history/${address}`, {
        headers: {
          'X-ACCESSIBILITY-LEVEL': this.accessibilityLevel,
          'X-LANGUAGE': this.language,
        },
      });

      if (!response.ok) {
        throw new Error('Error fetching payment history');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching payment history:', error);
      return [];
    }
  }

  /**
   * Extrae metadata de accesibilidad de la respuesta
   */
  private async extractAccessibilityMetadata(response: Response) {
    try {
      const body = await response.json().catch(() => ({}));
      return body.accessibility || {
        plainLanguage: body.message || '',
        technicalDetails: body.details,
        stepByStep: body.steps,
      };
    } catch {
      return undefined;
    }
  }

  /**
   * Formatea errores en un formato accesible
   */
  private formatError(error: unknown): PaymentError {
    const message = error instanceof Error ? error.message : 'Unknown error';

    return {
      code: 'PAYMENT_ERROR',
      message,
      details: error instanceof Error ? error.stack : undefined,
      accessibility: {
        plainLanguage: this.language === 'es'
          ? `Ocurrió un error al procesar el pago: ${message}`
          : `An error occurred while processing the payment: ${message}`,
        stepByStep: [
          this.language === 'es' ? 'Verificar conexión a internet' : 'Check internet connection',
          this.language === 'es' ? 'Verificar saldo de wallet' : 'Check wallet balance',
          this.language === 'es' ? 'Intentar nuevamente' : 'Try again',
        ],
      },
      recovery: {
        steps: [
          this.language === 'es' ? '1. Verificar que la wallet esté conectada' : '1. Check that wallet is connected',
          this.language === 'es' ? '2. Verificar que hay fondos suficientes' : '2. Check that there are sufficient funds',
          this.language === 'es' ? '3. Contactar soporte si el problema persiste' : '3. Contact support if problem persists',
        ],
        contact: 'soporte@ayuntamiento.es',
      },
    };
  }
}

// Exportar instancia singleton
export const x402Service = new X402FacilitatorService();
