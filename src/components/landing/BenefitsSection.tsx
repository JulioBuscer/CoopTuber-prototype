import { BsCode, BsLightningFill } from "solid-icons/bs";
import { OcPeople2 } from "solid-icons/oc";
import { SiApple, SiLinux, SiWindows } from "solid-icons/si";
import { TbDownloadOff } from "solid-icons/tb";
import '../../styles/landing/benefits.css';
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
                                <div class="benefit-icon blue">
                                    <TbDownloadOff class="icon-lg" />
                                </div>
                                <h3 class="feature-title">Sin instalaciones</h3>
                                <p class="feature-description">Sin instalaciones ni dependencias externas</p>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-content">
                            <div class="benefit-card">
                                <div class="benefit-icon yellow">
                                    <BsLightningFill class="icon-lg" />
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
                                    <BsCode class="icon-lg" />
                                </div>
                                <h3 class="feature-title">Código abierto</h3>
                                <p class="feature-description">Mejora, traduce o adapta según tus necesidades</p>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-content">
                            <div class="benefit-card">
                                <div class="benefit-icon purple benefit-icons-trinity">
                                    <SiWindows class="icon-sm" />
                                    <SiApple class="icon-sm" />
                                    <SiLinux class="icon-sm" />
                                </div>
                                <h3 class="feature-title">Multiplataforma</h3>
                                <p class="feature-description">Funciona en Windows, macOS, Linux</p>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-content">
                            <div class="benefit-card">
                                <div class="benefit-icon pink">
                                    <OcPeople2 class="icon-lg" />
                                </div>
                                <h3 class="feature-title">Para todos</h3>
                                <p class="feature-description">Ideal para streamers, parejas, amigos o equipos creativos</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BenefitsSection;