import { useContext } from 'react';
import type { WalletContextType } from './WalletProvider';
import { WalletContext } from './WalletContext';


export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};
