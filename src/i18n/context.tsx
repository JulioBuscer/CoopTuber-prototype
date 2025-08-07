// src/i18n/context.tsx
import { createContext, useContext, ParentComponent, createSignal, createEffect, onMount } from 'solid-js';
import * as i18n from '@solid-primitives/i18n';
import en from './locales/en';
import es from './locales/es';

type Locale = 'en' | 'es';
type Dictionary = i18n.Flatten<typeof en>;

const I18nContext = createContext<{
  locale: () => Locale;
  setLocale: (locale: Locale) => void;
  t: i18n.Translator<Dictionary>;
}>();

const I18nProvider: ParentComponent = (props) => {
  const [locale, setLocale] = createSignal<Locale>('es');
  const [isRouterReady, setIsRouterReady] = createSignal(false);
  
  // Flatten the dictionaries for better performance
  const dictionaries = {
    en: i18n.flatten(en),
    es: i18n.flatten(es)
  };

  // Change language and update URL
  const changeLanguage = (newLang: Locale) => {
    setLocale(newLang);
    
    if (typeof window === 'undefined') return;

    // Update URL without page reload
    const url = new URL(window.location.href);
    if (newLang === 'es') {
      url.searchParams.delete('lang');
    } else {
      url.searchParams.set('lang', newLang);
    }

    // Update the URL
    window.history.replaceState({}, '', url);
  };

  // Initialize locale from URL or browser settings
  onMount(() => {
    if (typeof window === 'undefined') return;

    let lang: Locale | null = null;
    
    // Try to get language from URL
    try {
      const params = new URLSearchParams(window.location.search);
      const langParam = params.get('lang') as Locale | null;
      if (langParam && (langParam === 'en' || langParam === 'es')) {
        lang = langParam;
      }
    } catch (e) {
      console.warn('Could not parse URL for language', e);
    }

    // Fallback to browser language
    if (!lang) {
      try {
        const browserLang = navigator.language.split('-')[0] as Locale;
        if (browserLang === 'es' || browserLang === 'en') {
          lang = browserLang;
        }
      } catch (e) {
        console.warn('Could not detect browser language', e);
      }
    }

    // Default to Spanish if no language could be determined
    if (lang) {
      setLocale(lang);
    }

    setIsRouterReady(true);
  });

  // Update document language when locale changes
  createEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale();
    }
  });

  // Create translator function
  const t = i18n.translator(() => dictionaries[locale()]);

  return (
    <I18nContext.Provider
      value={{
        locale,
        setLocale: changeLanguage,
        t
      }}
    >
      {isRouterReady() ? props.children : null}
    </I18nContext.Provider>
  );
};

const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

export { I18nProvider, useI18n };