/**
 * Mock del facilitador X402 para simulación
 */

import type {
  X402Response,
  PaymentRequest,
  PaymentConfirmation,
  BSVTransaction,
} from '../types/payment';
import type { AccessibilityLevel, Language } from '../types/accessibility';

export class MockX402Facilitator {
  private accessibilityLevel: AccessibilityLevel = 'standard';
  private language: Language = 'es';

  setAccessibilityLevel(level: AccessibilityLevel): void {
    this.accessibilityLevel = level;
  }

  setLanguage(language: Language): void {
    this.language = language;
  }

  async requestResource(resourcePath: string): Promise<X402Response> {
    // Simular delay de red
    await this.delay(500);

    // Extraer información del path
    const amount = this.extractAmountFromPath(resourcePath);

    return {
      status: 402,
      headers: {
        'X-PAYMENT-AMOUNT': amount.toString(),
        'X-PAYMENT-ADDRESS': this.generateMockAddress(),
        'X-PAYMENT-NETWORK': 'testnet',
        'X-ACCESSIBILITY-LEVEL': this.accessibilityLevel,
        'X-LANGUAGE': this.language,
      },
      body: {
        message: this.language === 'es' ? 'Pago requerido' : 'Payment required',
        amount,
        currency: 'satoshis',
      },
      accessibility: {
        plainLanguage: this.getPlainLanguageMessage('payment_required'),
        stepByStep: this.getStepByStepInstructions('payment_required'),
        screenReaderText: this.language === 'es'
          ? `Se requiere un pago de ${amount} satoshis para acceder a este servicio`
          : `A payment of ${amount} satoshis is required to access this service`,
      },
    };
  }

  async submitPayment(
    paymentRequest: PaymentRequest,
    signedTx: BSVTransaction
  ): Promise<PaymentConfirmation> {
    // Simular procesamiento de pago
    await this.delay(2000);

    // Simular posibles errores (10% de probabilidad)
    if (Math.random() < 0.1) {
      throw new Error(
        this.language === 'es'
          ? 'Error al procesar el pago. Por favor, intenta de nuevo.'
          : 'Error processing payment. Please try again.'
      );
    }

    const receiptId = this.generateReceiptId();

    return {
      txid: signedTx.txid,
      service: paymentRequest.service,
      amount: paymentRequest.amount,
      timestamp: Date.now(),
      confirmations: 0,
      receipt: {
        id: receiptId,
        url: `/receipts/${receiptId}`,
      },
      accessibility: {
        plainLanguage: this.getPlainLanguageMessage('payment_success'),
        stepByStep: this.getStepByStepInstructions('payment_success'),
        screenReaderText: this.language === 'es'
          ? `Pago completado exitosamente. ID de transacción: ${signedTx.txid.substring(0, 8)}...`
          : `Payment completed successfully. Transaction ID: ${signedTx.txid.substring(0, 8)}...`,
        helpContext: this.language === 'es'
          ? 'Puedes ver el recibo en la sección "Mis Pagos"'
          : 'You can view the receipt in the "My Payments" section',
      },
    };
  }

  async checkTransactionStatus(_txid: string): Promise<{ confirmed: boolean; confirmations: number }> {
    // Simular delay
    await this.delay(300);

    // Simular confirmaciones progresivas
    const confirmations = Math.floor(Math.random() * 6);

    return {
      confirmed: confirmations > 0,
      confirmations,
    };
  }

  async getPaymentHistory(_address: string): Promise<PaymentConfirmation[]> {
    // Simular delay
    await this.delay(800);

    // Generar historial simulado
    return Array.from({ length: 3 }, (_, i) => ({
      txid: this.generateMockTxid(),
      service: {
        id: `service-${i}`,
        type: 'ibi',
        category: 'taxes',
        name: { es: 'Servicio ejemplo', en: 'Example service' },
        description: { es: 'Descripción', en: 'Description' },
        price: 10000 * (i + 1),
        priceEur: 5 * (i + 1),
        requiresAuth: true,
      },
      amount: 10000 * (i + 1),
      timestamp: Date.now() - (i * 86400000), // Días anteriores
      confirmations: 6,
      receipt: {
        id: this.generateReceiptId(),
        url: `/receipts/receipt-${i}`,
      },
      accessibility: {
        plainLanguage: this.language === 'es' ? 'Pago completado' : 'Payment completed',
      },
    }));
  }

  private extractAmountFromPath(_path: string): number {
    // En un caso real, esto extraería el servicio del path
    // Para el mock, usamos un valor por defecto
    return 50000; // 50,000 satoshis
  }

  private generateMockAddress(): string {
    return '1MockAddressForTestingPurposes123';
  }

  private generateMockTxid(): string {
    const chars = '0123456789abcdef';
    let txid = '';
    for (let i = 0; i < 64; i++) {
      txid += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return txid;
  }

  private generateReceiptId(): string {
    return `REC-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;
  }

  private getPlainLanguageMessage(type: string): string {
    const messages = {
      payment_required: {
        es: 'Necesitas realizar un pago para acceder a este servicio.',
        en: 'You need to make a payment to access this service.',
      },
      payment_success: {
        es: 'Tu pago se ha procesado correctamente.',
        en: 'Your payment has been processed successfully.',
      },
    };

    return messages[type as keyof typeof messages]?.[this.language] || '';
  }

  private getStepByStepInstructions(type: string): string[] {
    const instructions = {
      payment_required: {
        es: [
          '1. Conecta tu wallet BSV',
          '2. Verifica el monto a pagar',
          '3. Confirma la transacción en tu wallet',
          '4. Espera la confirmación',
        ],
        en: [
          '1. Connect your BSV wallet',
          '2. Verify the payment amount',
          '3. Confirm the transaction in your wallet',
          '4. Wait for confirmation',
        ],
      },
      payment_success: {
        es: [
          '1. Transacción firmada y validada',
          '2. Pago transmitido a la blockchain BSV',
          '3. Confirmación recibida',
          '4. Recibo generado',
        ],
        en: [
          '1. Transaction signed and validated',
          '2. Payment broadcast to BSV blockchain',
          '3. Confirmation received',
          '4. Receipt generated',
        ],
      },
    };

    return instructions[type as keyof typeof instructions]?.[this.language] || [];
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const mockX402Service = new MockX402Facilitator();
