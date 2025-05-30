
import '../../styles/landing/openSource.css'
const OpenSourceSection = () => {
    return (

        <section class="section">
            <div class="container">
                <div class="opensource-content">
                    <h2 class="section-title">¿Por qué Open Source?</h2>
                    <div class="space-y-6">
                        <p class="opensource-text">
                            CoopTuber nació como una herramienta para streamers y creadores que quieran stremear con avatares virtuales en un mismo sitio juntos. Creemos en la tecnología libre, transparente y comunitaria.
                        </p>
                        <p class="opensource-text">
                            Puedes contribuir en GitHub, proponer mejoras o ayudar a llevar CoopTuber al siguiente nivel.
                        </p>
                        <div style={{ display: 'none' }} class="opensource-highlight">
                            <p>👉 ¿Te gustaría una versión en la nube para que no dependa de tu PC?</p>
                            <p>¡Apóyanos y llegaremos juntos!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OpenSourceSection;
