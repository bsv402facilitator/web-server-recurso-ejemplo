/**
 * Tipos para el sistema de accesibilidad WCAG 2.2 AAA
 */

export type Language = 'es' | 'en';

export type AccessibilityLevel = 'simple' | 'standard' | 'technical';

export type Theme = 'default' | 'high-contrast' | 'simplified';

export type TextSize = 'sm' | 'base' | 'lg' | 'xl' | '2xl';

export interface AccessibilitySettings {
  language: Language;
  level: AccessibilityLevel;
  theme: Theme;
  textSize: TextSize;
  textToSpeechEnabled: boolean;
  reducedMotion: boolean;
  keyboardNavigationHelp: boolean;
}

export interface AccessibilityMetadata {
  plainLanguage: string;
  technicalDetails?: string;
  stepByStep?: string[];
  screenReaderText?: string;
  helpContext?: string;
}

export interface TranslatedContent {
  es: string;
  en: string;
}

export interface AccessibleError {
  code: string;
  message: TranslatedContent;
  metadata: AccessibilityMetadata;
  suggestions: string[];
  severity: 'error' | 'warning' | 'info';
}
