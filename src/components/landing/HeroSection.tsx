const HeroSection = () => {
    return (

        <section class="hero">
            <div class="container">
                <div class="hero-grid">
                    <div class="hero-content">
                        <div class="space-y-4">
                            <h1 class="hero-title">
                                Anima tu rostro en <span class="gradient-text">tiempo real</span> con tus avatares personalizados
                            </h1>
                            <p class="hero-subtitle">
                                CoopTuber es una herramienta gratuita y open source para animar tu rostro con avatares animados desde tu
                                navegador. No necesitas instalar nada ni preocuparte por el rendimiento… si tu PC puede con el stream,
                                puede con CoopTuber.
                            </p>
                        </div>

                        <div class="hero-buttons">
                            <a href="#" class="btn btn-primary btn-lg">
                                <svg class="icon" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fill-rule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                Pruébalo ahora
                            </a>
                            <a href="#" class="btn btn-outline btn-lg">
                                <svg class="icon" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fill-rule="evenodd"
                                        d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                Ver en GitHub
                            </a>
                        </div>

                        <div class="hero-features">
                            <div class="feature-item">
                                <svg class="icon text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                Sin instalación
                            </div>
                            <div class="feature-item">
                                <svg class="icon text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                100% gratuito
                            </div>
                            <div class="feature-item">
                                <svg class="icon text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                Open source
                            </div>
                        </div>
                    </div>

                    <div class="hero-preview">
                        <div class="preview-container">
                            <div class="preview-grid">
                                <div class="preview-avatar preview-avatar-1">
                                    <div class="avatar-face">😊</div>
                                </div>
                                <div class="preview-avatar preview-avatar-2">
                                    <div class="avatar-face">🎭</div>
                                </div>
                            </div>
                            <div class="preview-badge">
                                <span class="badge badge-primary">Vista previa en vivo</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
