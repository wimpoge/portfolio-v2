import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const About = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  const tools = [
    'HTML',
    'CSS',
    'JavaScript',
    'React JS',
    'Svelte JS',
    'Vue JS',
    'Tailwind CSS',
    'Bootstrap',
    'Material UI',
    'Git',
    'Github',
    'Netlify',
    'Vercel'
  ]
  return (
    <div id='about-section' className='px-40 pt-10 '>
      <div className='grid gap-4'>
        <p>As a proficient web developer, I possess expertise in a diverse range of technologies, including HTML, CSS, and JavaScript for crafting dynamic and responsive user interfaces. My skill set extends to popular frontend libraries and frameworks such as React JS, Svelte JS, and Vue JS, allowing me to build scalable and interactive web applications. Additionally, I am well-versed in styling with Tailwind CSS, Bootstrap, and Material UI, ensuring a sleek and modern design for every project.</p>
        <p>Not only do I excel in web development, but I am also proficient in version control using Git and collaborative development through platforms like Github. Deployment is made seamless with my experience in utilizing services like Netlify and Vercel, guaranteeing efficient and reliable hosting solutions for web applications. My commitment to utilizing cutting-edge technologies and best practices in web development is evident in every project I undertake.</p>
        <p>Furthermore, I have a foundational understanding of Internet of Things (IoT) concepts, including basic proficiency in integrating IoT technologies like NodeMCU into my projects. This enables me to explore and contribute to simple IoT solutions, connecting devices to create straightforward and interactive applications. My continuous learning and practical approach reflect my dedication to staying current with technological advancements and expanding my skill set.</p>
      </div>
      <div>
        <h1 className='text-center text-2xl mt-2'>My Skills & Tools</h1>
        <div className='flex flex-wrap justify-center items-center gap-4 mt-4'>
          {tools.map((tool, i) => (
            <button className={`  p-4 rounded-md  ${theme === 'light' ? 'bg-orange-500 text-white' : 'bg-white text-black '}`} key={i}>{tool}</button>
          ))}
        </div>
      </div>
      <div className='text-center mt-12'>
        <button className={`rounded-md   p-4 ${theme === 'light' ? 'bg-orange-500 text-black hover:text-white' : 'bg-white text-black hover:bg-orange-500 hover:text-white'}`}>RESUME</button>
      </div>
    </div>
  );
}

export default About;
