import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';


const Contact = () => {
  const theme = useSelector((state) => state.theme);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/send-email', { name, email, message });
      alert('Email sent successfully');
    } catch (err) {
      alert('Failed to send email');
    }
  };

  return (
    <div id='contact-section' className='px-4 md:px-40 pt-10'>
      <span>You can contact me at</span>

      <form
        onSubmit={handleSubmit}
        className='grid gap-4 p-5 bg-white rounded shadow-lg text-black'
      >
        <input
          type='text'
          placeholder='Email'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-indigo-500'
        />

        <textarea
          name=''
          id=''
          cols='30'
          rows='10'
          placeholder='Your message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-indigo-500'
        ></textarea>
        <input
          type='submit'
          value='Send Message'
          className={`py-2 px-4 rounded  cursor-pointer  ${theme === 'light' ? 'bg-orange-500 text-white hover:bg-orange-600' : 'border-2 hover:bg-gray-500'}`}
        />
      </form>
    </div>
  );
};

export default Contact;
