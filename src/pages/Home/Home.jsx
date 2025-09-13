import React from 'react';
import Bannar from './Bannar';
import JobCategories from '../Category/JobCategories';
import AboutUs from './AboutUs';

const Home = () => {
    return (
        <div >
           <Bannar></Bannar>
           <JobCategories></JobCategories>
           <AboutUs></AboutUs>
        </div>
    );
};

export default Home;