import { VsGithub } from 'solid-icons/vs';
import '../../styles/landing/hero.css'
import { BsPlayCircle } from 'solid-icons/bs';
import { HiOutlineCodeBracket, HiOutlineStar } from 'solid-icons/hi';
import { TbDownloadOff } from 'solid-icons/tb';
import { createSignal, onCleanup, onMount } from 'solid-js';

const HeroSection = () => {
    const emojis = ['🙂', '😃','🙂', '😃','🙂', '😃','😆','😃','🙂', '😃','😆'];
    const [currentEmoji, setCurrentEmoji] = createSignal(0);
    
    let interval: number;
    
    onMount(() => {
        interval = window.setInterval(() => {
            setCurrentEmoji((prev) => (prev + 1) % emojis.length);
        }, 300) as unknown as number;
    });
    
    onCleanup(() => {
        if (interval) clearInterval(interval);
    });

    return (
        <section class="hero">
            <div class="container">
                <div class="hero-grid">
                    <div class="hero-content">
                        <div class="space-y-4">
                            <h1 class="hero-title">
                                <span class="emoji-container">
                                    {emojis.map((emoji, index) => (
                                        <span 
                                            class="emoji"
                                            classList={{ 'active': currentEmoji() === index }}
                                        >
                                            {emoji}
                                        </span>
                                    ))}
                                </span> Anima tu rostro en <span class="gradient-text">tiempo real</span> con tus avatares personalizados
                            </h1>
                            <p class="hero-subtitle">
                                CoopTuber es una herramienta gratuita y open source para animar tu rostro con avatares animados desde tu
                                navegador. No necesitas instalar nada ni preocuparte por el rendimiento… si tu PC puede con el stream,
                                puede con CoopTuber.
                            </p>
                        </div>

                        <div class="hero-buttons">
                            <a href="/app/#studio" class="btn btn-lg btn-primary">
                                <BsPlayCircle class="icon" />
                                Pruébalo ahora
                            </a>
                            <a href="#" class="btn btn-outline btn-lg">
                                <VsGithub class="icon" />
                                Ver en GitHub
                            </a>
                        </div>

                        <div class="hero-features">
                            <div class="feature-item">
                                <TbDownloadOff class="icon text-blue-400" />
                                Sin instalación
                            </div>
                            <div class="feature-item">
                                <HiOutlineStar class="icon text-yellow-400" />
                                100% gratuito
                            </div>
                            <div class="feature-item">
                                <HiOutlineCodeBracket class="icon text-green-400" />
                                Open source
                            </div>
                        </div>
                    </div>

                    <div class="hero-preview">
                        <div class="preview-container">

                            <video
                                autoplay
                                loop
                                muted
                                playsinline
                                class="preview-video-cooptuber"
                                preload="auto"
                                crossOrigin="anonymous"
                            >
                                <source src="https://pub-558fc3315aa946559101841eb6baee7e.r2.dev/public/projects/Cooptuber/cooptuber%20preview.webm" type="video/webm" />
                                <source src="https://pub-558fc3315aa946559101841eb6baee7e.r2.dev/public/projects/Cooptuber/cooptuber%20preview.mp4" type="video/mp4" />
                                Tu navegador no soporta videos HTML5
                            </video>
                            <div class="preview-grid display-none">
                                <div class="preview-avatar preview-avatar-1">
                                    <div class="avatar-face">😆</div>
                                </div>
                                <div class="preview-avatar preview-avatar-1">
                                    <div class="avatar-face">🙂</div>
                                </div>
                                <div class="preview-avatar preview-avatar-2">
                                    <div class="avatar-face">👥</div>
                                </div>
                            </div>
                            <div class="preview-badge">
                                <a href="/app/#studio" class="btn btn-primary btn-sm">
                                    <BsPlayCircle class="icon" />
                                    Pruébalo ahora
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;