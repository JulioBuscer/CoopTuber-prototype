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
  const { t, setLocale } = useI18n();
  const [showDropdown, setShowDropdown] = createSignal(false);

  return (
    <div class="nav-lng-container">
      <button class="nav-lng-btn" aria-label="Abrir menú" onClick={() => setShowDropdown(true)}>
        <span class="text-xl">{t('nav.languageIcon')}</span>
      </button>
      <div class={`nav-lng-menu${showDropdown() ? ' active' : ''}`}>
        <button
          class="nav-lng-link"
          onClick={() => {
            setLocale('es');
            setShowDropdown(false);
          }}>
          🇲🇽 ES
        </button>

        <button
          class="nav-lng-link"
          onClick={() => {
            setLocale('en');
            setShowDropdown(false);
          }}>
          🇺🇸 EN
        </button>
      </div>
      {showDropdown() && <div class="nav-lng-backdrop" onClick={() => setShowDropdown(false)} />}
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