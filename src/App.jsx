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
import Cookies from 'js-cookie';
import Register from './components/Register';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';

const BASE_URL = import.meta.env.VITE_API_URL;


function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState(null);

  const handleLogin = (token) => {
    setLoggedIn(true);
    setToken(token);

    Cookies.set('token', token, { expires: 1 / 8 });
  };

  const showUser = async () => {
    try {
      const res = await getData(`${BASE_URL}/profile/api/users/show`);
      console.log(res);
      setUserData(res);
    } catch (error) {
      console.error('Error during user data fetching:', error);
    }
  };

  useEffect(() => {
    const storedToken = Cookies.get('token');

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
    <Routes>
      <Route exact path='/' element={isLoggedIn ? <Dashboard userData={userData} /> : <LoginForm onLogin={handleLogin} />} />
      <Route exact path='/register' element={<Register />} />
      <Route exact path='/login' element={<LoginForm onLogin={handleLogin} />} />
    </Routes>


  )

}

export default App;
