import { createContext } from "react";
import type { AccessibilityLevel, AccessibilitySettings, Language, TextSize, Theme } from "../../types/accessibility";

export interface AccessibilityContextType {
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

export const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);
