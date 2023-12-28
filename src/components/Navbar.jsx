// Navbar.jsx

import React, { useState, useEffect } from 'react';
import BurgerMenu from '../assets/menu.png';
import BurgerCloseMenu from '../assets/cross.png';
import ThemeToggle from './ThemeToggle';
import Cookies from 'js-cookie';

const Navbar = () => {
    const [showNav, setShowNav] = useState(false);
    const [isLargeZoom, setIsLargeZoom] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);

    const handleToggleNav = () => {
        setShowNav(!showNav);
    };

    const handleScrollToSection = (event, sectionId) => {
        event.preventDefault();
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const checkZoomLevel = () => {
        const zoomLevel = (window.innerWidth / window.outerWidth) * 100;
        setIsLargeZoom(zoomLevel >= 200);
    };

    const logout = () => {
        Cookies.remove('token')
        window.location.reload();
    }

    useEffect(() => {
        checkZoomLevel();

        const handleResize = () => {
            checkZoomLevel();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.querySelector('.sticky-nav');
            if (navbar) {
                const scrollPosition = window.scrollY;
                setIsScrolling(scrollPosition > 120);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <React.Fragment>
            <div className={` mb-4 pt-4 sticky-nav ${isScrolling ? 'grid md:mx-10 gap-8' : 'grid grid-cols-5 mx-4 md:mx-20'}`}>
                <div className={` ${isScrolling ? 'w-[9%]' : 'col-span-1'}`}>My Profile</div>

                <div className={` ${isScrolling ? 'w-[9%]' : 'flex justify-center col-span-3'} gap-4`}>
                    <div onClick={(e) => handleScrollToSection(e, 'about-section')} data-section-id='about-section' className='custom-underline cursor-pointer'>About</div>
                    <div onClick={(e) => handleScrollToSection(e, 'projects-section')} data-section-id='projects-section' className='custom-underline cursor-pointer'>Projects</div>
                    <div onClick={(e) => handleScrollToSection(e, 'contact-section')} data-section-id='contact-section' className='custom-underline cursor-pointer'>Contact</div>
                </div>

                <div className={`  ${isScrolling ? 'w-[10%] col-span-1 grid justify-start' : 'col-span-1 flex gap-4 justify-end'}`}>
                    <ThemeToggle />
                    <button onClick={logout}>Logout</button>
                </div>


                {isLargeZoom && (
                    <img
                        src={showNav ? BurgerCloseMenu : BurgerMenu}
                        alt=""
                        className='w-5 h-5 md:hidden cursor-pointer'
                        onClick={handleToggleNav}
                    />
                )}

                {!isLargeZoom && (
                    <img
                        src={showNav ? BurgerCloseMenu : BurgerMenu}
                        alt=""
                        className='w-5 h-5 md:hidden cursor-pointer'
                        onClick={handleToggleNav}
                    />
                )}

            </div>
        </React.Fragment>
    );
};

export default Navbar;
