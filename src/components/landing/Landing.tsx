import BenefitsSection from "./BenefitsSection";
import CTASection from "./CTASection";
import FeaturesSection from "./FeaturesSection";
import HeroSection from "./HeroSection";
import HowToSection from "./HowToSection";
import OpenSourceSection from "./OpenSourceSection";

export default function LandingPage() {
    return (
        <div class="landing-page">

            {/* Hero Section */}
            <HeroSection />
            {/* ¿Qué es CoopTuber? */}
            <FeaturesSection />
            {/* ¿Cómo se usa con OBS? */}
            <HowToSection />
            {/* Beneficios */}
            <BenefitsSection/>
            {/* ¿Por qué Open Source? */}
            <OpenSourceSection />
            {/* Call to Action Final */}
            <CTASection />
        </div>
    )
}
