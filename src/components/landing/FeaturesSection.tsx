import '../../styles/landing/features.css'
const FeaturesSection = () => {
    return (
        <section id="features" class="section section-alt">
                <div class="container">
                    <div class="text-center mb-8">
                        <h2 class="section-title">¿Qué es CoopTuber?</h2>
                        <p class="section-subtitle">
                            Una app web de animación facial en tiempo real para creadores, sin complicaciones.
                        </p>
                    </div>

                    <div class="features-grid">
                        <div class="card">
                            <div class="card-content">
                                <div class="feature-card">
                                    <div class="feature-icon">🎭</div>
                                    <h3 class="feature-title">Avatar animado</h3>
                                    <p class="feature-description">Usa tu rostro para dar vida a un avatar animado en pantalla</p>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-content">
                                <div class="feature-card">
                                    <div class="feature-icon">
                                        <svg class="icon-lg" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fill-rule="evenodd"
                                                d="M4 5a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.414-1.414A1 1 0 0012.586 3H7.414a1 1 0 00-.707.293L5.293 4.707A1 1 0 014.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <h3 class="feature-title">Detección facial</h3>
                                    <p class="feature-description">Detecta expresiones mediante tu cámara, desde el navegador</p>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-content">
                                <div class="feature-card">
                                    <div class="feature-icon">
                                        <svg class="icon-lg" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fill-rule="evenodd"
                                                d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <h3 class="feature-title">Compatible con OBS</h3>
                                    <p class="feature-description">
                                        Usa OBS o cualquier programa de streaming para capturar la ventana
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-content">
                                <div class="feature-card">
                                    <div class="feature-icon">🧠</div>
                                    <h3 class="feature-title">Local</h3>
                                    <p class="feature-description">Se ejecuta completamente en tu máquina (sin servidores)</p>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-content">
                                <div class="feature-card">
                                    <div class="feature-icon">
                                        <svg class="icon-lg" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fill-rule="evenodd"
                                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <h3 class="feature-title">Open Source</h3>
                                    <p class="feature-description">
                                        100% gratuito, libre y open source – contribuye o crea tu propia versión
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    export default FeaturesSection;