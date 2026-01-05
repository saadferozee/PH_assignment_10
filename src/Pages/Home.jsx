import { useEffect } from 'react';
import HeroSection from '../Components/HeroSection';
import CategorySection from '../Components/CategorySection';
import RecentListingsSection from '../Components/RecentListingsSection';
import StatsSection from '../Components/StatsSection';
import FeaturesSection from '../Components/FeaturesSection';
import TestimonialsSection from '../Components/TestimonialsSection';
import AboutSection from '../Components/AboutSection';
import NewsletterSection from '../Components/NewsletterSection';
import PetHeroSection from '../Components/PetHeroSection';
import analyticsService from '../Services/analyticsService';

const Home = () => {
    useEffect(() => {
        // Track page view
        analyticsService.logPageView('home', 'AdoptyCo | Home');
    }, []);

    return (
        <div>
            <title>AdoptyCo | Home</title>
            <div>
                <div id={'hero-section'}>
                    <HeroSection></HeroSection>
                </div>
                <div id={'stats-section'}>
                    <StatsSection></StatsSection>
                </div>
                <div id={'category-section'}>
                    <CategorySection></CategorySection>
                </div>
                <div id={'recent-section'}>
                    <RecentListingsSection></RecentListingsSection>
                </div>
                <div id={'pet-hero-section'}>
                    <PetHeroSection></PetHeroSection>
                </div>
                <div id={'features-section'}>
                    <FeaturesSection></FeaturesSection>
                </div>
                <div id={'about-section'}>
                    <AboutSection></AboutSection>
                </div>
                <div id={'testimonials-section'}>
                    <TestimonialsSection></TestimonialsSection>
                </div>
                <div id={'newsletter-section'}>
                    <NewsletterSection></NewsletterSection>
                </div>
            </div>
        </div>
    );
};

export default Home;