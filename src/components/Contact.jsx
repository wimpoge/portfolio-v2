import React, { useState } from 'react'
import axios from 'axios';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3000/send-email', { name, email, message });            alert('Email sent');
        } catch (err) {
            alert('Failed to send email');
        }
    };

    return (
        <div id='contact-section' className='px-20 pt-10 h-[100vh] '>
            <span>
                You can contact me at
            </span>

            <form onSubmit={handleSubmit} className='grid gap-4 p-5 bg-white rounded shadow-lg text-black'>
            <input type="text" placeholder='Name' value={name} onChange={e => setName(e.target.value)} className='py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-indigo-500' />
            <input type="text" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} className='py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-indigo-500' />
            <textarea name="" id="" cols="30" rows="10" placeholder='Your message' value={message} onChange={e => setMessage(e.target.value)} className='py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-indigo-500'></textarea>
            <input type="submit" value="Send Message" className='py-2 px-4 rounded bg-orange-500 text-white cursor-pointer hover:bg-orange-600' />
        </form>

        </div>
    )
}

export default Contact