import React from 'react'
import Header from './Header';
import Navbar from './Navbar';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';

const Dashboard = ({ userData }) => {
    return (
        <div>
            <Navbar />
            <Header userData={userData} />
            <About userData={userData} />
            <Projects />
            <Contact />
        </div>
    )
}

export default Dashboard