/**
 * Tipos para pagos X402 y BSV
 */

import type { AccessibilityMetadata } from './accessibility';
import type { Service } from './services';

export type PaymentStatus =
  | 'idle'
  | 'requesting'
  | 'payment-required' // 402
  | 'signing'
  | 'broadcasting'
  | 'confirming'
  | 'confirmed'
  | 'failed';

export interface X402Response {
  status: number;
  headers: {
    'X-PAYMENT-AMOUNT'?: string;
    'X-PAYMENT-ADDRESS'?: string;
    'X-PAYMENT-NETWORK'?: string;
    'X-ACCESSIBILITY-LEVEL'?: string;
    'X-LANGUAGE'?: string;
  };
  body?: unknown;
  accessibility?: AccessibilityMetadata;
}

export interface BSVTransaction {
  txid: string;
  rawtx: string;
  inputs: Array<{
    txid: string;
    vout: number;
    satoshis: number;
  }>;
  outputs: Array<{
    satoshis: number;
    script: string;
  }>;
  fee: number;
}

export interface PaymentRequest {
  service: Service;
  amount: number; // satoshis
  paymentAddress: string;
  network: 'mainnet' | 'testnet';
  reference?: string;
}

export interface PaymentConfirmation {
  txid: string;
  service: Service;
  amount: number;
  timestamp: number;
  confirmations: number;
  receipt?: {
    id: string;
    url: string;
  };
  accessibility: AccessibilityMetadata;
}

export interface PaymentError {
  code: string;
  message: string;
  details?: string;
  accessibility?: AccessibilityMetadata;
  recovery?: {
    steps: string[];
    contact?: string;
  };
}

export interface WalletInfo {
  connected: boolean;
  address?: string;
  balance?: number; // satoshis
  network?: 'mainnet' | 'testnet';
}
