import { useContext } from 'react';
import { AccessibilityContext, type AccessibilityContextType } from './AccessibilityContextProvider';



export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};
