/**
 * Mock de Wallet BSV para simulación
 * Simula las funcionalidades de una wallet real
 */

import type { BSVTransaction } from '../types/payment';

export class MockBSVWallet {
  private connected = false;
  private address = '';
  private balance = 0;

  async requestAccounts(): Promise<string[]> {
    // Simular delay de conexión
    await this.delay(1000);

    // Generar dirección simulada
    this.address = this.generateMockAddress();
    this.balance = Math.floor(Math.random() * 1000000) + 100000; // Entre 100k y 1.1M satoshis
    this.connected = true;

    return [this.address];
  }

  async getBalance(): Promise<string> {
    if (!this.connected) {
      throw new Error('Wallet not connected');
    }

    // Simular delay
    await this.delay(300);

    return this.balance.toString();
  }

  async signTransaction(tx: Partial<BSVTransaction>): Promise<BSVTransaction> {
    if (!this.connected) {
      throw new Error('Wallet not connected');
    }

    // Simular delay de firma
    await this.delay(1500);

    // Simular confirmación del usuario (80% de éxito)
    if (Math.random() < 0.2) {
      throw new Error('User rejected transaction');
    }

    // Generar transacción simulada
    const txid = this.generateMockTxid();
    const rawtx = this.generateMockRawTx();

    const signedTx: BSVTransaction = {
      txid,
      rawtx,
      inputs: tx.inputs || [{
        txid: this.generateMockTxid(),
        vout: 0,
        satoshis: this.balance,
      }],
      outputs: tx.outputs || [],
      fee: 50, // 50 satoshis de fee
    };

    // Reducir balance
    const totalOutput = signedTx.outputs.reduce((sum, out) => sum + out.satoshis, 0);
    this.balance -= (totalOutput + signedTx.fee);

    return signedTx;
  }

  disconnect(): void {
    this.connected = false;
    this.address = '';
    this.balance = 0;
  }

  private generateMockAddress(): string {
    const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    let address = '1'; // BSV addresses start with 1
    for (let i = 0; i < 33; i++) {
      address += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return address;
  }

  private generateMockTxid(): string {
    const chars = '0123456789abcdef';
    let txid = '';
    for (let i = 0; i < 64; i++) {
      txid += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return txid;
  }

  private generateMockRawTx(): string {
    // Generar un raw tx hex simulado
    const chars = '0123456789abcdef';
    let rawtx = '01000000'; // version
    for (let i = 0; i < 200; i++) {
      rawtx += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return rawtx;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Inyectar mock wallet en window
if (typeof window !== 'undefined') {
  // @ts-expect-error - Añadiendo mock wallet global
  window.bsvWallet = new MockBSVWallet();
}

export const mockWallet = new MockBSVWallet();
