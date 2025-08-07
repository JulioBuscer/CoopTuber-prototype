import { BsCode, BsLightningFill } from "solid-icons/bs";
import { OcPeople2 } from "solid-icons/oc";
import { SiApple, SiLinux, SiWindows } from "solid-icons/si";
import { TbDownloadOff } from "solid-icons/tb";
import '../../styles/landing/benefits.css';
import { useI18n } from "../../i18n/context";
const BenefitsSection = () => {
    const { t } = useI18n();
    return (
        <section id="benefits" class="section section-alt">
            <div class="container">
                <div class="text-center mb-8">
                    <h2 class="section-title">{t('benefits.title')}</h2>
                </div>

                <div class="benefits-grid">
                    <div class="card">
                        <div class="card-content">
                            <div class="benefit-card">
                                <div class="benefit-icon blue">
                                    <TbDownloadOff class="icon-lg" />
                                </div>
                                <h3 class="feature-title">{t('benefits.items.0.title')}</h3>
                                <p class="feature-description">{t('benefits.items.0.description')}</p>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-content">
                            <div class="benefit-card">
                                <div class="benefit-icon yellow">
                                    <BsLightningFill class="icon-lg" />
                                </div>
                                <h3 class="feature-title">{t('benefits.items.1.title')}</h3>
                                <p class="feature-description">{t('benefits.items.1.description')}</p>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-content">
                            <div class="benefit-card">
                                <div class="benefit-icon green">
                                    <BsCode class="icon-lg" />
                                </div>
                                <h3 class="feature-title">{t('benefits.items.2.title')}</h3>
                                <p class="feature-description">{t('benefits.items.2.description')}</p>
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
                                <h3 class="feature-title">{t('benefits.items.3.title')}</h3>
                                <p class="feature-description">{t('benefits.items.3.description')}</p>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-content">
                            <div class="benefit-card">
                                <div class="benefit-icon pink">
                                    <OcPeople2 class="icon-lg" />
                                </div>
                                <h3 class="feature-title">{t('benefits.items.4.title')}</h3>
                                <p class="feature-description">{t('benefits.items.4.description')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BenefitsSection;