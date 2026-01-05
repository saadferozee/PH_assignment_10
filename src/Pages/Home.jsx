import React, { useEffect } from 'react';
import HeroSection from '../Components/HeroSection';
import CategorySection from '../Components/CategorySection';
import RecentListingsSection from '../Components/RecentListingsSection';
import AboutSection from '../Components/AboutSection';
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
                <div id={'category-section'}>
                    <CategorySection></CategorySection>
                </div>
                <div id={'recent-section'}>
                    <RecentListingsSection></RecentListingsSection>
                </div>
                <div id={'about-section'}>
                    <AboutSection></AboutSection>
                </div>
                <div id={'pet-hero-section'}>
                    <PetHeroSection></PetHeroSection>
                </div>
            </div>
        </div>
    );
};

export default Home;