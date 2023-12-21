import moment from 'moment';
import React, { useEffect, useState } from 'react';
import github from '../assets/github.png';
import { useDispatch, useSelector } from 'react-redux';

const Projects = () => {
  const theme = useSelector((state) => state.theme);

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchRepos = async () => {
      const res = await fetch(
        `https://api.github.com/users/wimpoge/repos`
      );
      const data = await res.json();
      setItems(data);
    };

    fetchRepos();
  }, []);

  return (
    <div id='projects-section' className='px-4 md:px-40 pt-20 overflow-auto'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {items.map((item, i) => (
          <div className={` rounded-md grid p-4 relative ${theme === 'light' ? 'bg-[#f97316]' : ' border-2'}`} key={i}>
            <img src={github} alt="" className='w-5 h-5 corner-img' />
            <span className='overflow-auto text-[10px] mb-4'>
              created at: {moment(item.created_at).format('MMMM Do YYYY')}
            </span>
            <span className='overflow-auto'>name app: {item.name}</span>
            <span className='overflow-auto'>language: {item.language}</span>
            <a
              href={item.homepage}
              className='overflow-auto text-blue-600'
              target='_blank'
              rel='noopener noreferrer'
            >
              {item.homepage === '' || item.homepage === null
                ? 'No Link Available'
                : 'See Page'}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
