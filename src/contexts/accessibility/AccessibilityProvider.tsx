import React, { useEffect, useState, type ReactNode } from 'react';
import type {
  AccessibilityLevel,
  AccessibilitySettings,
  Language,
  TextSize,
  Theme,
} from '../../types/accessibility';
import { AccessibilityContext, type AccessibilityContextType } from './AccessibilityContext';

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

    // If no saved settings, check system preferences 
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersContrast = window.matchMedia('(prefers-contrast: high)');

    return {
      ...DEFAULT_SETTINGS,
      reducedMotion: prefersReducedMotion.matches,
      theme: prefersContrast.matches ? 'high-contrast' : 'default',
    };
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


