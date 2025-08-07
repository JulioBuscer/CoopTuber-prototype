import { TbDownloadOff, TbPlugOff } from "solid-icons/tb";
import { VsTools } from "solid-icons/vs";
import '../../styles/landing/howTo.css';
import { useI18n } from "../../i18n/context";
const HowToSection = () => {
    const { t } = useI18n();
    return (

        <section id="how-to" class="section">
            <div class="container">
                <div class="steps-container">
                    <div class="text-center mb-8">
                        <h2 class="section-title">{t('howTo.title')}</h2>
                        <p class="section-subtitle">
                            {t('howTo.description')}
                        </p>
                    </div>

                    <div class="space-y-8">
                        {
                            t('howTo.steps').map((step, index) => (
                                <div class="step">
                                    <div class="step-number">{index + 1}</div>
                                    <div class="step-content">
                                        <h3>{step.title}</h3>
                                        <p>{step.description}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <div class="steps-features">
                        <div class="feature-item text-green-400">
                            <TbPlugOff class="icon" />
                            {t('howTo.features.0')}
                        </div>
                        <div class="feature-item text-green-400">
                            <TbDownloadOff class="icon" />
                            {t('howTo.features.1')}
                        </div>
                        <div class="feature-item text-green-400">
                            <VsTools class="icon" />
                            {t('howTo.features.2')}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowToSection;
