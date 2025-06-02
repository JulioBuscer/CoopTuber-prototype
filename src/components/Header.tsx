import { Component, createSignal } from 'solid-js';
import { A } from '@solidjs/router';
import { VsGithub } from 'solid-icons/vs';
import { OcPeople2 } from 'solid-icons/oc';
import { HiOutlineBars3, HiOutlineXCircle } from 'solid-icons/hi';

const Nav: Component = () => (
  <nav class="header-nav">
    <A href="/#features" class="nav-link">Características</A>
    <A href="/#how-to" class="nav-link">Cómo usar</A>
    <A href="/#benefits" class="nav-link">Beneficios</A>
    <A href="/app" class="nav-link">Probar ahora</A>
    <A href="https://github.com/JulioBuscer/CoopTuber-prototype" class="nav-link btn btn-outline" target="_blank">
      <VsGithub class="icon" /> GitHub
    </A>
  </nav>
);

const NavBurger: Component = () => {
  const [open, setOpen] = createSignal(false);

  return (
    <div class="nav-burger-container">
      <button class="nav-burger-btn" aria-label="Abrir menú" onClick={() => setOpen(true)}>
        <HiOutlineBars3 size={28} />
      </button>
      <div class={`nav-burger-menu${open() ? ' active' : ''}`}>
        <A href="/app" class="nav-burger-link" onClick={() => setOpen(false)}>Probar ahora</A>
        <A href="/#features" class="nav-burger-link" onClick={() => setOpen(false)}>Características</A>
        <A href="/#how-to" class="nav-burger-link" onClick={() => setOpen(false)}>Cómo usar</A>
        <A href="/#benefits" class="nav-burger-link" onClick={() => setOpen(false)}>Beneficios</A>
        <A href="https://github.com/JulioBuscer/CoopTuber-prototype" class="nav-burger-link" target="_blank" onClick={() => setOpen(false)}>
          <VsGithub class="icon" /> GitHub
        </A>
      </div>
      {open() && <div class="nav-burger-backdrop" onClick={() => setOpen(false)} />}
    </div>
  );
};

const Header: Component = () => (
  <header class="header">
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
      </div>
      <div class="mobile-nav">
        <NavBurger />
      </div>
    </div>
  </header>
);

export default Header;