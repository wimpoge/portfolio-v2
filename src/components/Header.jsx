import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../redux/themeReducer';
const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  const fullText = 'Frontend Developer';
  const [text, setText] = useState('');

  useEffect(() => {
    let index = 0;
    let direction = 1;

    const intervalId = setInterval(() => {
      setText(fullText.slice(0, index));

      if (index === 0) {
        direction = 1;
      }

      index += direction;

      if (index > fullText.length) {
        direction = -1;
      }
    }, 200);

    return () => clearInterval(intervalId);
  }, [fullText]);

  return (
    <div className='px-40 py-8 h-[100vh]'>
      <div className='flex flex-col justify-center items-center'>
        <img src='https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250' className='rounded-full' alt='avatar' />
        <h1 className={`text-5xl  ${theme === 'light' ? ' text-black' : ' text-white'}`}>Muhamad Rafli</h1>
        <code className={`text-2xl  font-semibold typing-animation ${theme === 'light' ? 'bg-black text-white' : 'bg-white text-black'}`} style={{ minHeight: '1.5em' }}>{text}</code>
      </div>
    </div>
  );
};

export default Header;
