
import '../../styles/landing/openSource.css'
import { useI18n } from "../../i18n/context";
const OpenSourceSection = () => {
    const { t } = useI18n();
    return (

        <section class="section">
            <div class="container">
                <div class="opensource-content">
                    <h2 class="section-title">{t('openSource.title')}</h2>
                    <div class="space-y-6">
                        <p class="opensource-text">
                            {t('openSource.description')}
                        </p>
                        <p class="opensource-text">
                            {t('openSource.contribute')}
                        </p>
                        <div style={{ display: 'none' }} class="opensource-highlight">
                            <p>{t('openSource.highlight.0')}</p>
                            <p>{t('openSource.highlight.1')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OpenSourceSection;
