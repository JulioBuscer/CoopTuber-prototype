import { Component } from 'solid-js';
import { A } from '@solidjs/router';

const Header: Component = () => {
  return (
    <header class="app-header">
      <div class="header-content">
        <A href="/" class="logo">CoopTuber</A>
        <nav class="header-nav">
          <A href="/" class="nav-link">Inicio</A>
          <A href="/app" class="nav-link">Aplicación</A>
          <A href="https://github.com/JulioBuscer/CoopTuber-prototype" class="nav-link github-link" target="_blank">
            GitHub
          </A>
        </nav>
      </div>
    </header>
  );
};

export default Header;