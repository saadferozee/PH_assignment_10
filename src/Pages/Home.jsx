import React from 'react';
import HeroSection from '../Components/HeroSection';
import CategorySection from '../Components/CategorySection';
import RecentListingsSection from '../Components/RecentListingsSection';
import AboutSection from '../Components/AboutSection';
import PetHeroSection from '../Components/PetHeroSection';

const Home = () => {
    return (
        <div className=''>
            <title>AdoptyCo | Home</title>
            <div>
                <HeroSection></HeroSection>
                <CategorySection></CategorySection>
                <RecentListingsSection></RecentListingsSection>
                <AboutSection></AboutSection>
                <PetHeroSection></PetHeroSection>
            </div>
        </div>
    );
};

export default Home;