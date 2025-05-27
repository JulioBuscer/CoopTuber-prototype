import { Component } from 'solid-js';
import { A } from '@solidjs/router';
import { VsGithub } from 'solid-icons/vs';
import { OcPeople2 } from 'solid-icons/oc';

const Header: Component = () => {
  return (
    <header class="header">
      <div class="header-content">
        <A href="/" class="logo">

          <div class="logo-icon">
            <OcPeople2 class="icon" text-decoration='none' />
          </div>
          CoopTuber
          <span class="badge badge-outline">Open Source</span>
        </A>

        <nav class="header-nav">
          <A href="/#features" class="nav-link">
            Características
          </A>
          <A href="/#how-to" class="nav-link">
            Cómo usar
          </A>
          <A href="/#benefits" class="nav-link">
            Beneficios
          </A>
        </nav>
        <nav class="header-nav">
          <A href="/app" class="nav-link">Probar ahora</A>
          <A href="https://github.com/JulioBuscer/CoopTuber-prototype" class="nav-link github-link" target="_blank">
            <VsGithub class="icon" />  GitHub
          </A>
        </nav>
      </div>
    </header>
  );
};

export default Header;