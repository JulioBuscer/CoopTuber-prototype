import { createEffect } from 'solid-js';
import { useI18n } from '../i18n/context';

/**
 * Updates the document's meta tags based on the current language
 */
export function useMetaUpdater() {
  const { t } = useI18n();
  
  createEffect(() => {
    // Update document title
    document.title = t('meta.title');
    
    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', t('meta.description'));
    
    // Update OpenGraph meta tags
    const updateMetaProperty = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    
    // Update OpenGraph title and description
    updateMetaProperty('og:title', t('meta.title'));
    updateMetaProperty('og:description', t('meta.description'));
    updateMetaProperty('og:locale', t('meta.locale'));
    
    // Update Twitter card
    updateMetaProperty('twitter:title', t('meta.title'));
    updateMetaProperty('twitter:description', t('meta.description'));
    
    // Update HTML lang attribute
    document.documentElement.lang = t('meta.locale').split('_')[0];
  });
}
