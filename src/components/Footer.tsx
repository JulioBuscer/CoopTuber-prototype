import { Component } from 'solid-js';
import { SiGithub, SiLinkedin, SiNetlify } from 'solid-icons/si';
import { FiShield } from 'solid-icons/fi';
import { BiRegularCookie } from 'solid-icons/bi';
import { HiOutlineDocumentText } from 'solid-icons/hi';
import '../styles/footer.css'
import { useI18n } from '../i18n/context';
interface FooterProps { }

const Footer: Component<FooterProps> = () => {
    const { t } = useI18n();
    return (
        <footer class="footer">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>CoopTuber</h3>
                    <p>{t('footer.developBy')} <b>Julio Buscer</b></p>
                    <div class="social-links">
                        <a href="https://github.com/JulioBuscer" target="_blank" rel="noopener noreferrer">
                            <SiGithub size={24} />
                        </a>
                        <a href="https://www.linkedin.com/in/juliobuscer/" target="_blank" rel="noopener noreferrer">
                            <SiLinkedin size={24} />
                        </a>
                        <a href="https://juliobuscer.netlify.app/" target="_blank" rel="noopener noreferrer">
                            <SiNetlify size={24} />
                        </a>
                    </div>
                </div>

                <div class="footer-section">
                    <h3>{t('footer.documentation.title')}</h3>
                    <ul>
                        <li><a href="/terms" target="_blank" rel="noopener noreferrer"><HiOutlineDocumentText /> {t('footer.documentation.terms')}</a></li>
                        <li><a href="/privacy" target="_blank" rel="noopener noreferrer"><FiShield /> {t('footer.documentation.privacy')}</a></li>
                        <li><a href="/cookies" target="_blank" rel="noopener noreferrer"><BiRegularCookie /> {t('footer.documentation.cookies')}</a></li>
                        <li><a href="https://github.com/JulioBuscer/CoopTuber-prototype" target="_blank" rel="noopener noreferrer"> <SiGithub /> {t('footer.documentation.github')}</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h3>{t('footer.contact.title')}</h3>
                    <p>Email: juliobuscer@gmail.com</p>
                    <p>Website: <a href="https://juliobuscer.netlify.app/" target="_blank" rel="noopener noreferrer">juliobuscer.netlify.app</a></p>
                </div >

                <div class="footer-section">
                    <h3>{t('footer.license.title')}</h3>
                    <p>{t('footer.license.description')} <a href="https://www.apache.org/licenses/LICENSE-2.0" target="_blank" rel="noopener noreferrer">{t('footer.license.license')}</a></p>
                </div >
            </div >
            <div class="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Julio Buscer</p>
            </div>
        </footer >
    );
};

export default Footer;