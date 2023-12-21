import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://100.78.16.82:2500/profile/api/users/signin', {
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
                localStorage.setItem('token', token);
                // set cookie to 12 hours
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
        </div>
    );
};

export default LoginForm;
