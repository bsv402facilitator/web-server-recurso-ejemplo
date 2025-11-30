import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type {
  AccessibilitySettings,
  Theme,
  AccessibilityLevel,
  TextSize,
  Language,
} from '../types/accessibility';

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateTheme: (theme: Theme) => void;
  updateLevel: (level: AccessibilityLevel) => void;
  updateTextSize: (size: TextSize) => void;
  updateLanguage: (language: Language) => void;
  toggleTextToSpeech: () => void;
  toggleReducedMotion: () => void;
  toggleKeyboardHelp: () => void;
  speak: (text: string) => void;
  stopSpeaking: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

const DEFAULT_SETTINGS: AccessibilitySettings = {
  language: 'es',
  level: 'standard',
  theme: 'default',
  textSize: 'base',
  textToSpeechEnabled: false,
  reducedMotion: false,
  keyboardNavigationHelp: false,
};

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    // Cargar desde localStorage si existe
    const saved = localStorage.getItem('accessibility-settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_SETTINGS;
      }
    }
    return DEFAULT_SETTINGS;
  });

  const [synth] = useState(() => window.speechSynthesis);

  // Guardar en localStorage cuando cambian los settings
  useEffect(() => {
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
  }, [settings]);

  // Aplicar tema al documento
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme);
    document.documentElement.setAttribute('data-text-size', settings.textSize);
  }, [settings.theme, settings.textSize]);

  // Aplicar reducción de movimiento
  useEffect(() => {
    if (settings.reducedMotion) {
      document.documentElement.style.setProperty('--transition-speed', '0ms');
    } else {
      document.documentElement.style.removeProperty('--transition-speed');
    }
  }, [settings.reducedMotion]);

  // Detectar preferencias del sistema
  useEffect(() => {
    // Reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches && !localStorage.getItem('accessibility-settings')) {
      setSettings(prev => ({ ...prev, reducedMotion: true }));
    }

    // High contrast
    const prefersContrast = window.matchMedia('(prefers-contrast: high)');
    if (prefersContrast.matches && !localStorage.getItem('accessibility-settings')) {
      setSettings(prev => ({ ...prev, theme: 'high-contrast' }));
    }
  }, []);

  const updateTheme = (theme: Theme) => {
    setSettings(prev => ({ ...prev, theme }));
  };

  const updateLevel = (level: AccessibilityLevel) => {
    setSettings(prev => ({ ...prev, level }));
  };

  const updateTextSize = (textSize: TextSize) => {
    setSettings(prev => ({ ...prev, textSize }));
  };

  const updateLanguage = (language: Language) => {
    setSettings(prev => ({ ...prev, language }));
    document.documentElement.setAttribute('lang', language);
  };

  const toggleTextToSpeech = () => {
    setSettings(prev => ({ ...prev, textToSpeechEnabled: !prev.textToSpeechEnabled }));
  };

  const toggleReducedMotion = () => {
    setSettings(prev => ({ ...prev, reducedMotion: !prev.reducedMotion }));
  };

  const toggleKeyboardHelp = () => {
    setSettings(prev => ({
      ...prev,
      keyboardNavigationHelp: !prev.keyboardNavigationHelp,
    }));
  };

  const speak = (text: string) => {
    if (!settings.textToSpeechEnabled || !synth) return;

    // Cancelar cualquier speech anterior
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = settings.language === 'es' ? 'es-ES' : 'en-US';
    utterance.rate = 0.9; // Velocidad ligeramente reducida para mejor comprensión
    utterance.pitch = 1;
    utterance.volume = 1;

    synth.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synth) {
      synth.cancel();
    }
  };

  const value: AccessibilityContextType = {
    settings,
    updateTheme,
    updateLevel,
    updateTextSize,
    updateLanguage,
    toggleTextToSpeech,
    toggleReducedMotion,
    toggleKeyboardHelp,
    speak,
    stopSpeaking,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};
