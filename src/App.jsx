import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import Header from './components/Header'
import Navbar from './components/Navbar'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar />
      <Header />
      <About />
      <Projects />
      <Contact />
    </div>
  )
}

export default App
