import React from 'react';
import '../index.css';

const Navbar = () => {
    const handleScrollToSection = (event, sectionId) => {
        event.preventDefault();
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <div className='flex my-4 mx-20 justify-between sticky-nav'>
                <div>My Profile</div>
                <div className='flex gap-4'>
                    <div onClick={(e) => handleScrollToSection(e, 'about-section')} data-section-id='about-section' className='custom-underline cursor-pointer'>About</div>
                    <div onClick={(e) => handleScrollToSection(e, 'projects-section')} data-section-id='projects-section' className='custom-underline cursor-pointer'>Projects</div>
                    <div onClick={(e) => handleScrollToSection(e, 'contact-section')} data-section-id='contact-section' className='custom-underline cursor-pointer'>Contact</div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
