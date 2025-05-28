import { Component } from 'solid-js';
import { SiGithub, SiLinkedin, SiNetlify } from 'solid-icons/si';
import { FiShield } from 'solid-icons/fi';
import { BiRegularCookie } from 'solid-icons/bi';
import { HiOutlineDocumentText } from 'solid-icons/hi';
import '../styles/footer.css'
interface FooterProps { }

const Footer: Component<FooterProps> = () => {
    return (
        <footer class="footer">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>CoopTuber</h3>
                    <p>Desarrollado por <b>Julio Buscer</b></p>
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
                    <h3>Documentación</h3>
                    <ul>
                        <li><a href="/terms" target="_blank" rel="noopener noreferrer"><HiOutlineDocumentText /> Términos y Condiciones</a></li>
                        <li><a href="/privacy" target="_blank" rel="noopener noreferrer"><FiShield /> Política de Privacidad</a></li>
                        <li><a href="/cookies" target="_blank" rel="noopener noreferrer"><BiRegularCookie /> Aviso de Cookies</a></li>
                        <li><a href="https://github.com/JulioBuscer/CoopTuber-prototype" target="_blank" rel="noopener noreferrer"> <SiGithub /> GitHub Repository</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h3>Contacto</h3>
                    <p>Email: juliobuscer@gmail.com</p>
                    <p>Website: <a href="https://juliobuscer.netlify.app/" target="_blank" rel="noopener noreferrer">juliobuscer.netlify.app</a></p>
                </div >

                <div class="footer-section">
                    <h3>Licencia</h3>
                    <p>Este proyecto está bajo la <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer">Licencia MIT</a></p>
                </div >
            </div >
            <div class="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Julio Buscer</p>
            </div>
        </footer >
    );
};

export default Footer;