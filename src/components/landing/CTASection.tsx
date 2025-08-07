import { HiOutlineCodeBracket, HiOutlineStar } from "solid-icons/hi";
import { TbDownloadOff } from "solid-icons/tb";
import '../../styles/landing/cta.css'
import { useI18n } from "../../i18n/context";

const CTASection = () => {
    const { t } = useI18n();
    return (

        <section class="section cta-section">
            <div class="container">
                <div class="cta-content">
                    <h2 class="cta-title">🚀 Empieza a dar vida a tu avatar sin límites, sin costos y sin complicaciones</h2>
                    <h4>{t('cta.description')}</h4>
                    <p class="cta-subtitle">
                        {t('cta.subtitle')}
                    </p>

                    <div class="cta-buttons">
                        <a href="/app" class="btn btn-primary btn-lg">
                            <svg class="icon" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            {t('cta.tryNow')}
                        </a>
                        <a href="#" class="btn btn-outline btn-lg">
                            <svg class="icon" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fill-rule="evenodd"
                                    d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            {t('cta.viewOnGithub')}
                        </a>
                    </div>

                    <div class="cta-features">
                        <div class="cta-feature">
                            <HiOutlineStar class="icon text-yellow-400" />
                            {t('cta.features.free')}
                        </div>
                        <div class="cta-feature">
                            <HiOutlineCodeBracket class="icon text-green-400" />
                            {t('cta.features.openSource')}
                        </div>
                        <div class="cta-feature">
                            <TbDownloadOff class="icon text-blue-400" />
                            {t('cta.features.noInstallation')}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CTASection;