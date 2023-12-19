import React from 'react';

const About = () => {
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
    <div id='about-section' className='px-20 pt-10 h-[100vh] '>      
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit at eum in quae id vel veniam facere dolorem sapiente quaerat laboriosam reiciendis recusandae obcaecati incidunt voluptatem, est quo earum officia culpa? Dolorum repellat cumque quia ullam molestiae officiis amet accusantium! Ipsa ut debitis autem fugiat maxime pariatur dicta quidem dolor reprehenderit molestias alias voluptatem doloremque nobis quaerat, quos tempora dolores! Voluptatem quam suscipit nostrum, corporis atque nam culpa minima doloribus ea optio, omnis dolores voluptates nulla quod aliquam est, quae laboriosam sapiente porro. Earum, accusamus sapiente quidem maiores aperiam dolorum dolore tempore sint ex minus officia a iure modi quae illum nam est ea animi, itaque voluptates. Sint dolorum vel excepturi itaque fugit commodi temporibus quibusdam vero, hic culpa sed, quis rerum maxime et laudantium. Magnam illo, tempora ea molestias rerum repellat at maiores modi omnis laboriosam soluta porro iure mollitia minus animi ratione possimus eaque quisquam aspernatur. Autem quidem nam ab vitae cumque quis asperiores architecto amet consequuntur consequatur, necessitatibus adipisci id sint officiis! Obcaecati labore harum tempora vero sapiente sit quidem placeat aspernatur incidunt reiciendis repellat perspiciatis ea, dolore illum, laborum possimus minus nihil sed quam nesciunt aperiam iusto veritatis! Placeat dolor, alias eligendi laboriosam et ad tempora!</p>
    <div>
        <h1 className='text-center text-2xl mt-2'>My Skills & Tools</h1>
        <div className='flex flex-wrap justify-center items-center gap-4 mt-4'>
            {tools.map((tool, i) => (
                <button className='bg-white text-black p-4 rounded-md hover:bg-orange-500 hover:text-white' key={i}>{tool}</button>
            ))}
        </div>
    </div>
    </div>
  );
}

export default About;
