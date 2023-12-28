import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_URL;


const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/profile/api/users/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data, 'data')
                const token = data.data.token;
                document.cookie = `token=${token}; max-age=43200; path=/`;
                  onLogin(token);
            } else {
                console.error('Authentication failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className='grid text-center justify-center rounded-md bg-gray-500 m-40 p-20'>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className='grid gap-4'>
                        <label className=''>
                            Username:
                        </label>
                        <input
                            className='text-black  bg-transparent border-2 rounded-lg p-2 hover:bg-blue-400'
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className='grid gap-4 mt-4'>
                        <label className=''>
                            Password:
                        </label>
                        <input
                            className='text-black  bg-transparent border-2 rounded-lg p-2 hover:bg-blue-400'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='text-center mt-8'>
                        <button type="submit" className='border-2 rounded-lg p-2 hover:bg-black hover:text-white'>Login</button>
                    </div>
                </form>
            </div>
                        <button type="submit" className='border-2 rounded-lg p-2 hover:bg-black hover:text-white' onClick={() => navigate('/register')}>Register</button>

           
        </div>
    );
};

export default LoginForm;
