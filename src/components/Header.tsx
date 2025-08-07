import { Component, createSignal, Show } from 'solid-js';
import { A } from '@solidjs/router';
import { VsGithub } from 'solid-icons/vs';
import { OcPeople2 } from 'solid-icons/oc';
import { HiOutlineBars3 } from 'solid-icons/hi';
import { showHeader } from '../data/signals/utils';
import { useI18n } from '../i18n/context'

const Nav: Component = () => {
  const { t } = useI18n();
  return (
  <nav class="header-nav">
    <A href="/#features" class="nav-link">{t('nav.features')}</A>
    <A href="/#how-to" class="nav-link">{t('nav.howTo')}</A>
    <A href="/#benefits" class="nav-link">{t('nav.benefits')}</A>
    <A href="/app" class="nav-link">{t('nav.tryNow')}</A>
    <A href="https://github.com/JulioBuscer/CoopTuber-prototype" class="nav-link btn btn-outline" target="_blank">
      <VsGithub class="icon" /> GitHub
    </A>
  </nav>
);
};

const NavBurger: Component = () => {
  const { t } = useI18n();
  const [open, setOpen] = createSignal(false);

  return (
    <div class="nav-burger-container">
      <button class="nav-burger-btn" aria-label="Abrir menú" onClick={() => setOpen(true)}>
        <HiOutlineBars3 size={28} />
      </button>
      <div class={`nav-burger-menu${open() ? ' active' : ''}`}>
        <A href="/app" class="nav-burger-link" onClick={() => setOpen(false)}>{t('nav.tryNow')}</A>
        <A href="/#features" class="nav-burger-link" onClick={() => setOpen(false)}>{t('nav.features')}</A>
        <A href="/#how-to" class="nav-burger-link" onClick={() => setOpen(false)}>{t('nav.howTo')}</A>
        <A href="/#benefits" class="nav-burger-link" onClick={() => setOpen(false)}>{t('nav.benefits')}</A>
        <A href="https://github.com/JulioBuscer/CoopTuber-prototype" class="nav-burger-link" target="_blank" onClick={() => setOpen(false)}>
          <VsGithub class="icon" /> GitHub
        </A>
      </div>
      {open() && <div class="nav-burger-backdrop" onClick={() => setOpen(false)} />}
    </div>
  );
};

const LanguageSelector = () => {
  const { t, setLocale, locale } = useI18n();
  const [showDropdown, setShowDropdown] = createSignal(false);

  return (
    <div class="relative">
      <button
        class="nav-link flex items-center gap-1"
        onClick={() => setShowDropdown(!showDropdown())}
        aria-label={t('nav.language')}
      >
        <span class="text-sm">{locale().toUpperCase()}</span>
      </button>

      <Show when={showDropdown()}>
        <div class="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
          <button
            class={`w-full text-left px-4 py-2 text-sm ${locale() === 'es' ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            onClick={() => {
              setLocale('es');
              setShowDropdown(false);
            }}
          >
            🇪🇸 Español
          </button>
          <button
            class={`w-full text-left px-4 py-2 text-sm ${locale() === 'en' ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            onClick={() => {
              setLocale('en');
              setShowDropdown(false);
            }}
          >
            🇬🇧 English
          </button>
        </div>
      </Show>
    </div>
  );
};

const Header: Component = () => {
  return (
    <header class={`header ${showHeader() ? 'visible' : 'hidden'}`}>
      <div class="header-content">
        <A href="/" class="logo">
          <div class="logo-icon">
            <OcPeople2 class="icon" text-decoration='none' />
          </div>
          CoopTuber
          <span class="badge badge-outline">Open Source</span>
        </A>
        <div class="desktop-nav">
          <Nav />
          <LanguageSelector />
        </div>
        <div class="mobile-nav">
          <NavBurger />
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};

export default Header;