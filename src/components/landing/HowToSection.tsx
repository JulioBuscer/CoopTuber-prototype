const HowToSection = () => {
    return (
        
        <section id="how-to" class="section">
        <div class="container">
            <div class="steps-container">
                <div class="text-center mb-8">
                    <h2 class="section-title">¿Cómo se usa con OBS?</h2>
                    <p class="section-subtitle">
                        CoopTuber no requiere integración especial con OBS. Solo sigue estos pasos:
                    </p>
                </div>

                <div class="space-y-8">
                    <div class="step">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h3>Abre CoopTuber en tu navegador</h3>
                            <p>No necesitas instalar nada, funciona directamente desde el navegador</p>
                        </div>
                    </div>

                    <div class="step">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h3>Configura tu avatar y fondo verde virtual</h3>
                            <p>Personaliza tu avatar y activa el chroma key para un fondo transparente</p>
                        </div>
                    </div>

                    <div class="step">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h3>En OBS, selecciona "Captura de ventana"</h3>
                            <p>Elige la ventana del navegador donde tienes CoopTuber abierto</p>
                        </div>
                    </div>

                    <div class="step">
                        <div class="step-number success">✓</div>
                        <div class="step-content">
                            <h3>¡Listo! Tu avatar se verá en vivo en tus streams</h3>
                            <p>Sin plugins, sin configuraciones técnicas, sin instalar nada</p>
                        </div>
                    </div>
                </div>

                <div class="steps-features">
                    <div class="feature-item text-green-400">
                        <svg class="icon" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        Sin plugins
                    </div>
                    <div class="feature-item text-green-400">
                        <svg class="icon" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        Sin configuraciones técnicas
                    </div>
                    <div class="feature-item text-green-400">
                        <svg class="icon" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        Sin instalar nada
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
};

export default HowToSection;
