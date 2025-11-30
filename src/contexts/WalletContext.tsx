import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { WalletInfo, BSVTransaction } from '../types/payment';

interface WalletContextType {
  wallet: WalletInfo;
  connect: () => Promise<void>;
  disconnect: () => void;
  getBalance: () => Promise<number>;
  signTransaction: (tx: Partial<BSVTransaction>) => Promise<BSVTransaction>;
  isConnecting: boolean;
  error: string | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

const DEFAULT_WALLET: WalletInfo = {
  connected: false,
  address: undefined,
  balance: undefined,
  network: 'testnet',
};

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [wallet, setWallet] = useState<WalletInfo>(DEFAULT_WALLET);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    setError(null);

    try {
      // Verificar si existe un wallet provider (ej: HandCash, Money Button, etc.)
      // @ts-expect-error - bsvWallet es una extensión del navegador
      if (typeof window.bsvWallet === 'undefined') {
        throw new Error('No se detectó ninguna wallet BSV. Por favor, instala una extensión de wallet BSV.');
      }

      // @ts-expect-error - bsvWallet es una extensión del navegador
      const accounts = await window.bsvWallet.requestAccounts();

      if (!accounts || accounts.length === 0) {
        throw new Error('No se pudo obtener acceso a la wallet.');
      }

      const address = accounts[0];

      // Obtener balance
      // @ts-expect-error - bsvWallet es una extensión del navegador
      const balance = await window.bsvWallet.getBalance();

      setWallet({
        connected: true,
        address,
        balance: parseInt(balance),
        network: 'testnet', // TODO: Detectar network
      });

      // Guardar en localStorage
      localStorage.setItem('wallet-connected', 'true');
      localStorage.setItem('wallet-address', address);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al conectar la wallet';
      setError(errorMessage);
      console.error('Error connecting wallet:', err);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setWallet(DEFAULT_WALLET);
    setError(null);
    localStorage.removeItem('wallet-connected');
    localStorage.removeItem('wallet-address');
  }, []);

  const getBalance = useCallback(async (): Promise<number> => {
    if (!wallet.connected) {
      throw new Error('Wallet no conectada');
    }

    try {
      // @ts-expect-error - bsvWallet es una extensión del navegador
      const balance = await window.bsvWallet.getBalance();
      const balanceNum = parseInt(balance);

      setWallet(prev => ({ ...prev, balance: balanceNum }));
      return balanceNum;
    } catch (err) {
      console.error('Error getting balance:', err);
      throw err;
    }
  }, [wallet.connected]);

  const signTransaction = useCallback(async (tx: Partial<BSVTransaction>): Promise<BSVTransaction> => {
    if (!wallet.connected) {
      throw new Error('Wallet no conectada');
    }

    try {
      // @ts-expect-error - bsvWallet es una extensión del navegador
      const signedTx = await window.bsvWallet.signTransaction(tx);
      return signedTx as BSVTransaction;
    } catch (err) {
      console.error('Error signing transaction:', err);
      throw err;
    }
  }, [wallet.connected]);

  // Restaurar conexión al cargar
  React.useEffect(() => {
    const wasConnected = localStorage.getItem('wallet-connected') === 'true';
    if (wasConnected) {
      connect().catch(console.error);
    }
  }, [connect]);

  const value: WalletContextType = {
    wallet,
    connect,
    disconnect,
    getBalance,
    signTransaction,
    isConnecting,
    error,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};
