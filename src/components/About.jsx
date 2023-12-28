import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const About = ({ userData }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  return (
    <div id='about-section' className='px-40 pt-10 '>
      {userData && userData.data && userData.data.length > 0 ? (
        userData.data.map((user) => (
          <div key={user.id}>
            <p>{user.desc}</p>
            <div>
              <h1 className='text-center text-2xl mt-2'>My Skills & Tools</h1>
              <div className='flex flex-wrap justify-center items-center gap-4 mt-4'>

                {user.skills.map((skill, index) => (
                  <button
                    key={index}
                    className={`p-4 rounded-md ${theme === 'light' ? 'bg-orange-500 text-white' : 'bg-white text-black '}`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
            <div className='text-center mt-12'>
              <button
                className={`rounded-md   p-4 ${theme === 'light'
                  ? 'bg-orange-500 text-black hover:text-white'
                  : 'bg-white text-black hover:bg-orange-500 hover:text-white'
                  }`}
              >
                RESUME
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default About;
