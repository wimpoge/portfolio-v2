import React, { useState, useEffect } from 'react';

const Header = () => {
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
    <div className='px-20 h-[100vh]'>
      <div className='flex flex-col justify-center items-center h-[100vh]'>
        <img src='https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250' className='rounded-full' alt='avatar' />
        <h1 className='text-5xl text-white'>Muhamad Rafli</h1>
        <code className='text-2xl text-white font-semibold typing-animation' style={{ minHeight: '1.5em' }}>{text}</code>
      </div>
    </div>
  );
};

export default Header;
