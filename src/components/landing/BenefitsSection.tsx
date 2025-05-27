const BenefitsSection = () => {
    return (
        <section id="benefits" class="section section-alt">
        <div class="container">
            <div class="text-center mb-8">
                <h2 class="section-title">Beneficios</h2>
            </div>

            <div class="benefits-grid">
                <div class="card">
                    <div class="card-content">
                        <div class="benefit-card">
                            <div class="benefit-icon blue">🧩</div>
                            <h3 class="feature-title">Sin instalaciones</h3>
                            <p class="feature-description">Sin instalaciones ni dependencias externas</p>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-content">
                        <div class="benefit-card">
                            <div class="benefit-icon yellow">
                                <svg class="icon-lg" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fill-rule="evenodd"
                                        d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </div>
                            <h3 class="feature-title">Rápido y fluido</h3>
                            <p class="feature-description">Corre rápido y fluido en cualquier navegador moderno</p>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-content">
                        <div class="benefit-card">
                            <div class="benefit-icon green">
                                <svg class="icon-lg" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fill-rule="evenodd"
                                        d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </div>
                            <h3 class="feature-title">Código abierto</h3>
                            <p class="feature-description">Mejora, traduce o adapta según tus necesidades</p>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-content">
                        <div class="benefit-card">
                            <div class="benefit-icon purple">📦</div>
                            <h3 class="feature-title">Multiplataforma</h3>
                            <p class="feature-description">Funciona en Windows, macOS, Linux</p>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-content">
                        <div class="benefit-card">
                            <div class="benefit-icon pink">
                                <svg class="icon-lg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                                </svg>
                            </div>
                            <h3 class="feature-title">Para todos</h3>
                            <p class="feature-description">Ideal para streamers, amigos o equipos creativos</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
}

export default BenefitsSection;