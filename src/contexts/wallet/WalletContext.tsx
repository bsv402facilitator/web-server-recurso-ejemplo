import { createContext } from 'react';
import type { WalletContextType } from './WalletProvider';

export const WalletContext = createContext<WalletContextType | undefined>(undefined);
