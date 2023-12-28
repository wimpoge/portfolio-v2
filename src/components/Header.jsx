import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const BASE_URL = import.meta.env.VITE_API_URL;

const Header = ({ userData }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  const fullText = userData && userData.data && userData.data.length > 0
  ? userData.data[0].job_name
  : '';
  const [text, setText] = useState('');
  const [image, setImage] = useState('');

  const showImage = async () => {
    if (userData && userData.data && userData.data.length > 0) {
      const user = userData.data[0];

      if (user && user.image) {
        const apiUrl = `${BASE_URL}/profile/api/users/image/${user.image}`;
        console.log('API URL:', apiUrl);
        try {
          const res = await fetch(apiUrl);
          const imageData = await res.blob();
          setImage(URL.createObjectURL(imageData));
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      }
    }
  };

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

  useEffect(() => {
    if (userData && userData.data && userData.data.length > 0) {
      showImage();
    }
  }, [userData]); 

  return (
    <div className='px-40 py-8 h-[100vh]'>
      <div className=''>
        {userData && userData.data && userData.data.length > 0 ? (
          userData.data.map((user) => (
            <div key={user.id} className='grid justify-items-center'>
              <img src={image} className='rounded-full w-[400px] h-[400px]' alt='avatar' />
              <h1 className={`text-5xl ${theme === 'light' ? 'text-black' : 'text-white'}`}>{user.name}</h1>
              <code
                className={`text-2xl font-semibold typing-animation ${
                  theme === 'light' ? 'bg-black text-white' : 'bg-white text-black'
                }`}
                style={{ minHeight: '1.5em' }}
              >
                {text}
              </code>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Header;
