// src/components/ThemeToggle.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../redux/themeReducer';
import DarkMode from '../assets/moon(1).png'
import LightMode from '../assets/contrast.png'
const ThemeToggle = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        dispatch(setTheme(newTheme));
        document.body.classList.toggle('light-theme', newTheme === 'light');
        document.body.classList.toggle('dark-theme', newTheme === 'dark');
    };

    return (
        <>
            <div className={`rounded-full p-2 ${theme === 'light' ? 'bg-black' : 'bg-white'}`}>
                <img
                    src={theme === 'light' ? DarkMode : LightMode}
                    alt={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
                    onClick={toggleTheme}
                    style={{ cursor: 'pointer', width: '20px', height: '20px' }}
                />
            </div>

        </>
    );
};

export default ThemeToggle;
