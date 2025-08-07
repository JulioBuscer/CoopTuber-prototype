import { VsGithub } from 'solid-icons/vs';
import '../../styles/landing/hero.css'
import { BsPlayCircle } from 'solid-icons/bs';
import { HiOutlineCodeBracket, HiOutlineStar } from 'solid-icons/hi';
import { TbDownloadOff } from 'solid-icons/tb';
import { createSignal, onCleanup, onMount } from 'solid-js';
import { useI18n } from '../../i18n/context';

const HeroSection = () => {
    const { t } = useI18n();
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
                                </span> {t('hero.title.part1')}<span class="gradient-text">{t('hero.title.highlight')}</span>{t('hero.title.part2')}
                            </h1>
                            <p class="hero-subtitle">
                                {t('hero.description')}
                            </p>
                        </div>

                        <div class="hero-buttons">
                            <a href="/app/#studio" class="btn btn-lg btn-primary">
                                {t('hero.tryNow')} <BsPlayCircle class="ml-2" />
                            </a>
                            <a 
                                href="https://github.com/JulioBuscer/CoopTuber-prototype" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                class="btn btn-lg btn-outline"
                            >
                                <VsGithub class="mr-2" /> {t('hero.viewOnGithub')}
                            </a>
                        </div>

                        <div class="hero-features">
                            <div class="feature-item">
                                <TbDownloadOff class="icon text-blue-400" />
                                <span>{t('hero.features.openSource')}</span>
                            </div>
                            <div class="feature-item">
                                <HiOutlineStar class="icon text-yellow-400" />
                                <span>{t('hero.features.noInstallation')}</span>
                            </div>
                            <div class="feature-item">
                                <HiOutlineCodeBracket class="icon text-green-400" />
                                <span>{t('hero.features.free')}</span>
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
                                    {t('hero.tryNow')}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;