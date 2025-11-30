import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import type { Theme, TextSize, AccessibilityLevel } from '../../types/accessibility';

interface AccessibilityPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccessibilityPanel: React.FC<AccessibilityPanelProps> = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const {
    settings,
    updateTheme,
    updateTextSize,
    updateLevel,
    updateLanguage,
    toggleTextToSpeech,
    toggleReducedMotion,
    toggleKeyboardHelp,
  } = useAccessibility();

  const themes: Theme[] = ['default', 'high-contrast', 'simplified'];
  const textSizes: TextSize[] = ['sm', 'base', 'lg', 'xl', '2xl'];
  const levels: AccessibilityLevel[] = ['simple', 'standard', 'technical'];

  const handleSave = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('accessibility.title')}
      size="lg"
      footer={
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {t('common.save')}
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Idioma */}
        <div>
          <label className="block font-bold text-lg mb-3">
            🌐 {t('accessibility.language')}
          </label>
          <div className="flex gap-3">
            <Button
              variant={settings.language === 'es' ? 'primary' : 'outline'}
              onClick={() => {
                updateLanguage('es');
                i18n.changeLanguage('es');
              }}
              aria-pressed={settings.language === 'es'}
            >
              Español
            </Button>
            <Button
              variant={settings.language === 'en' ? 'primary' : 'outline'}
              onClick={() => {
                updateLanguage('en');
                i18n.changeLanguage('en');
              }}
              aria-pressed={settings.language === 'en'}
            >
              English
            </Button>
          </div>
        </div>

        {/* Tema */}
        <div>
          <label className="block font-bold text-lg mb-3">
            🎨 {t('accessibility.theme')}
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {themes.map(theme => (
              <button
                key={theme}
                onClick={() => updateTheme(theme)}
                className={`p-4 border-2 rounded text-left transition-all ${
                  settings.theme === theme
                    ? 'border-primary bg-primary bg-opacity-10'
                    : 'border-neutral-light hover:border-primary'
                }`}
                aria-pressed={settings.theme === theme}
              >
                <div className="font-bold mb-2">
                  {t(`accessibility.themes.${theme}`)}
                </div>
                <div className="flex gap-2 mt-2">
                  {theme === 'default' && (
                    <>
                      <div className="w-8 h-8 rounded bg-primary" aria-hidden="true" />
                      <div className="w-8 h-8 rounded bg-secondary" aria-hidden="true" />
                      <div className="w-8 h-8 rounded bg-neutral-light" aria-hidden="true" />
                    </>
                  )}
                  {theme === 'high-contrast' && (
                    <>
                      <div className="w-8 h-8 rounded bg-black" aria-hidden="true" />
                      <div className="w-8 h-8 rounded bg-white border-2 border-black" aria-hidden="true" />
                    </>
                  )}
                  {theme === 'simplified' && (
                    <>
                      <div className="w-8 h-8 rounded bg-blue-500" aria-hidden="true" />
                      <div className="w-8 h-8 rounded bg-gray-500" aria-hidden="true" />
                    </>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tamaño de texto */}
        <div>
          <label className="block font-bold text-lg mb-3">
            📏 {t('accessibility.text_size')}
          </label>
          <div className="flex gap-2 flex-wrap">
            {textSizes.map(size => (
              <Button
                key={size}
                variant={settings.textSize === size ? 'primary' : 'outline'}
                size={size === 'sm' ? 'sm' : 'base'}
                onClick={() => updateTextSize(size)}
                aria-pressed={settings.textSize === size}
              >
                {t(`accessibility.text_sizes.${size}`)}
              </Button>
            ))}
          </div>
          <div className="mt-3 p-3 bg-neutral-light rounded">
            <p className={`text-${settings.textSize}`}>
              {t('accessibility.preview_text')}
            </p>
          </div>
        </div>

        {/* Nivel de detalle */}
        <div>
          <label className="block font-bold text-lg mb-3">
            📊 {t('accessibility.level')}
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {levels.map(level => (
              <button
                key={level}
                onClick={() => updateLevel(level)}
                className={`p-4 border-2 rounded text-left transition-all ${
                  settings.level === level
                    ? 'border-primary bg-primary bg-opacity-10'
                    : 'border-neutral-light hover:border-primary'
                }`}
                aria-pressed={settings.level === level}
              >
                <div className="font-bold mb-1">
                  {t(`accessibility.levels.${level}`)}
                </div>
                <div className="text-sm text-neutral-gray">
                  {level === 'simple' && t('accessibility.level_desc.simple')}
                  {level === 'standard' && t('accessibility.level_desc.standard')}
                  {level === 'technical' && t('accessibility.level_desc.technical')}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Opciones adicionales */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg">⚙️ {t('accessibility.additional_options')}</h3>

          {/* Text to Speech */}
          <label className="flex items-center justify-between p-4 border-2 border-neutral-light rounded cursor-pointer hover:border-primary">
            <div className="flex items-center gap-3">
              <span className="text-2xl" aria-hidden="true">🔊</span>
              <div>
                <div className="font-semibold">{t('accessibility.text_to_speech')}</div>
                <div className="text-sm text-neutral-gray">{t('accessibility.text_to_speech_desc')}</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.textToSpeechEnabled}
              onChange={toggleTextToSpeech}
              className="w-6 h-6"
              aria-label={t('accessibility.text_to_speech')}
            />
          </label>

          {/* Reduced Motion */}
          <label className="flex items-center justify-between p-4 border-2 border-neutral-light rounded cursor-pointer hover:border-primary">
            <div className="flex items-center gap-3">
              <span className="text-2xl" aria-hidden="true">🎬</span>
              <div>
                <div className="font-semibold">{t('accessibility.reduced_motion')}</div>
                <div className="text-sm text-neutral-gray">{t('accessibility.reduced_motion_desc')}</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.reducedMotion}
              onChange={toggleReducedMotion}
              className="w-6 h-6"
              aria-label={t('accessibility.reduced_motion')}
            />
          </label>

          {/* Keyboard Help */}
          <label className="flex items-center justify-between p-4 border-2 border-neutral-light rounded cursor-pointer hover:border-primary">
            <div className="flex items-center gap-3">
              <span className="text-2xl" aria-hidden="true">⌨️</span>
              <div>
                <div className="font-semibold">{t('accessibility.keyboard_help')}</div>
                <div className="text-sm text-neutral-gray">{t('accessibility.keyboard_help_desc')}</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.keyboardNavigationHelp}
              onChange={toggleKeyboardHelp}
              className="w-6 h-6"
              aria-label={t('accessibility.keyboard_help')}
            />
          </label>
        </div>

        {/* Info WCAG */}
        <div className="p-4 bg-feedback-success bg-opacity-10 border-2 border-feedback-success rounded">
          <p className="font-bold text-feedback-success mb-2">
            ✅ {t('accessibility.wcag_compliant')}
          </p>
          <p className="text-sm">
            {t('accessibility.wcag_desc')}
          </p>
        </div>
      </div>
    </Modal>
  );
};
