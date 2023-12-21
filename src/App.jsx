
// app.jsx
import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './index.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import LoginForm from './components/Login';
import { updateData } from './utils/updateData';
import { getData } from './utils/getData';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState(null);

  const handleLogin = (token) => {
    setLoggedIn(true);
    setToken(token);

    localStorage.setItem('token', token);
  };


  const showUser = async () => {
    try {
      console.log('Before calling getData');
      const res = await getData(`http://17.1.16.57:2500/profile/api/users/show`);
      console.log('After calling getData');
  
      if (res.ok) {
        const data = await res.json();
        console.log('Received data:', data);
        setUserData(data);
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error during user data fetching:', error);
    }
  };
  

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      setLoggedIn(true);
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      showUser();
    }
  }, [isLoggedIn, token]);

  return (
    <div>
      {isLoggedIn ? (
        <>
          <Navbar/>
          <Header userData={userData} />
          <About />
          <Projects />
          <Contact />
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
